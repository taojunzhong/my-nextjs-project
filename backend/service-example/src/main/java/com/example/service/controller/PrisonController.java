package com.example.service.controller;

import com.example.common.dto.PrisonDTO;
import com.example.common.dto.PrisonRequest;
import com.example.common.response.Result;
import com.example.service.service.PrisonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/prison")
@CrossOrigin(origins = "*")
public class PrisonController {

    @Autowired
    private PrisonService prisonService;

    @GetMapping("/list")
    public Result<List<PrisonDTO>> getAllPrisons() {
        return prisonService.getAllPrisons();
    }

    @GetMapping("/{id}")
    public Result<PrisonDTO> getPrisonById(@PathVariable Long id) {
        return prisonService.getPrisonById(id);
    }

    @PostMapping("/create")
    public Result<PrisonDTO> createPrison(@RequestBody PrisonRequest request) {
        return prisonService.createPrison(request);
    }

    @PutMapping("/{id}")
    public Result<PrisonDTO> updatePrison(@PathVariable Long id, @RequestBody PrisonRequest request) {
        request.setId(id);
        return prisonService.updatePrison(id, request);
    }

    @DeleteMapping("/{id}")
    public Result<Void> deletePrison(@PathVariable Long id) {
        return prisonService.deletePrison(id);
    }
}
