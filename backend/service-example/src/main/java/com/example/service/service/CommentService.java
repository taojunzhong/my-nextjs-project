package com.example.service.service;

import com.example.common.dto.CommentDTO;
import com.example.common.dto.CommentRequest;
import com.example.common.entity.CommentEntity;
import com.example.common.response.Result;
import com.example.service.repository.CommentRepository;
import com.example.service.repository.PrisonRepository;
import com.example.service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PrisonRepository prisonRepository;

    @Autowired
    private UserRepository userRepository;

    public Result<List<CommentDTO>> getCommentsByPrisonId(Long prisonId) {
        List<CommentEntity> comments = commentRepository.findByPrisonIdAndDeletedOrderByCreateTimeDesc(prisonId, 0);
        List<CommentDTO> dtos = comments.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return Result.success(dtos);
    }

    public Result<CommentDTO> addComment(CommentRequest request, Long userId) {
        if (!prisonRepository.existsById(request.getPrisonId())) {
            return Result.error(404, "牢九门不存在");
        }

        var userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            return Result.error(404, "用户不存在");
        }

        CommentEntity comment = new CommentEntity();
        comment.setPrisonId(request.getPrisonId());
        comment.setUserId(userId);
        comment.setUsername(userOpt.get().getUsername());
        comment.setContent(request.getContent());

        CommentEntity savedComment = commentRepository.save(comment);
        return Result.success("评论成功", convertToDTO(savedComment));
    }

    private CommentDTO convertToDTO(CommentEntity entity) {
        CommentDTO dto = new CommentDTO();
        dto.setId(entity.getId());
        dto.setPrisonId(entity.getPrisonId());
        dto.setUserId(entity.getUserId());
        dto.setUsername(entity.getUsername());
        dto.setContent(entity.getContent());
        dto.setCreateTime(entity.getCreateTime());
        return dto;
    }
}