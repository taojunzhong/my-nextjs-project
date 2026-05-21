package com.example.service.controller;

import com.example.common.dto.CommentDTO;
import com.example.common.dto.CommentRequest;
import com.example.common.response.Result;
import com.example.service.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comment")
@CrossOrigin(origins = "*")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping("/prison/{prisonId}")
    public Result<List<CommentDTO>> getComments(@PathVariable Long prisonId) {
        return commentService.getCommentsByPrisonId(prisonId);
    }

    @PostMapping("/add")
    public Result<CommentDTO> addComment(@RequestBody CommentRequest request, @RequestHeader(value = "X-User-Id", required = false) String userIdStr) {
        Long userId = userIdStr != null ? Long.parseLong(userIdStr) : 1L;
        return commentService.addComment(request, userId);
    }
}