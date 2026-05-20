package com.example.service.service;

import com.example.common.dto.PrisonDTO;
import com.example.common.dto.PrisonRequest;
import com.example.common.entity.PrisonEntity;
import com.example.common.response.Result;
import com.example.service.repository.PrisonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PrisonService {

    @Autowired
    private PrisonRepository prisonRepository;

    public Result<List<PrisonDTO>> getAllPrisons() {
        List<PrisonEntity> prisons = prisonRepository.findAll().stream()
                .filter(p -> p.getDeleted() == 0)
                .collect(Collectors.toList());
        List<PrisonDTO> prisonDTOs = prisons.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return Result.success(prisonDTOs);
    }

    public Result<PrisonDTO> getPrisonById(Long id) {
        PrisonEntity prison = prisonRepository.findById(id).orElse(null);
        if (prison == null || prison.getDeleted() == 1) {
            return Result.error(404, "牢九门不存在");
        }
        return Result.success(convertToDTO(prison));
    }

    public Result<PrisonDTO> createPrison(PrisonRequest request) {
        if (prisonRepository.existsByPrisonNumber(request.getPrisonNumber())) {
            return Result.error(400, "牢九门编号已存在");
        }

        PrisonEntity prison = new PrisonEntity();
        prison.setName(request.getName());
        prison.setPrisonNumber(request.getPrisonNumber());
        prison.setDescription(request.getDescription());
        prison.setLocation(request.getLocation());
        prison.setSecurityLevel(request.getSecurityLevel());
        prison.setWardenName(request.getWardenName());
        prison.setContactPhone(request.getContactPhone());
        prison.setAvatar(request.getAvatar());
        prison.setStatus(request.getStatus() != null ? request.getStatus() : 1);

        PrisonEntity savedPrison = prisonRepository.save(prison);
        return Result.success("创建成功", convertToDTO(savedPrison));
    }

    public Result<PrisonDTO> updatePrison(Long id, PrisonRequest request) {
        PrisonEntity prison = prisonRepository.findById(id).orElse(null);
        if (prison == null || prison.getDeleted() == 1) {
            return Result.error(404, "牢九门不存在");
        }

        if (!prison.getPrisonNumber().equals(request.getPrisonNumber()) 
            && prisonRepository.existsByPrisonNumber(request.getPrisonNumber())) {
            return Result.error(400, "牢九门编号已存在");
        }

        prison.setName(request.getName());
        prison.setPrisonNumber(request.getPrisonNumber());
        prison.setDescription(request.getDescription());
        prison.setLocation(request.getLocation());
        prison.setSecurityLevel(request.getSecurityLevel());
        prison.setWardenName(request.getWardenName());
        prison.setContactPhone(request.getContactPhone());
        prison.setAvatar(request.getAvatar());
        if (request.getStatus() != null) {
            prison.setStatus(request.getStatus());
        }

        PrisonEntity updatedPrison = prisonRepository.save(prison);
        return Result.success("更新成功", convertToDTO(updatedPrison));
    }

    public Result<Void> deletePrison(Long id) {
        PrisonEntity prison = prisonRepository.findById(id).orElse(null);
        if (prison == null || prison.getDeleted() == 1) {
            return Result.error(404, "牢九门不存在");
        }
        prison.setDeleted(1);
        prisonRepository.save(prison);
        return Result.success("删除成功", null);
    }

    private PrisonDTO convertToDTO(PrisonEntity prison) {
        PrisonDTO dto = new PrisonDTO();
        dto.setId(prison.getId());
        dto.setName(prison.getName());
        dto.setPrisonNumber(prison.getPrisonNumber());
        dto.setDescription(prison.getDescription());
        dto.setLocation(prison.getLocation());
        dto.setSecurityLevel(prison.getSecurityLevel());
        dto.setWardenName(prison.getWardenName());
        dto.setContactPhone(prison.getContactPhone());
        dto.setAvatar(prison.getAvatar());
        dto.setStatus(prison.getStatus());
        dto.setCreateTime(prison.getCreateTime());
        dto.setUpdateTime(prison.getUpdateTime());
        return dto;
    }
}
