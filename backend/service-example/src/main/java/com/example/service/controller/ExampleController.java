package com.example.service.controller;

import com.example.common.response.Result;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/example")
public class ExampleController {

    @GetMapping("/hello")
    public Result<String> hello() {
        return Result.success("Hello from service-example!");
    }

    @GetMapping("/info")
    public Result<Map<String, Object>> getInfo(@RequestParam(required = false) String name) {
        Map<String, Object> info = new HashMap<>();
        info.put("service", "service-example");
        info.put("version", "1.0.0");
        info.put("name", name != null ? name : "Guest");
        return Result.success(info);
    }

    @PostMapping("/create")
    public Result<Map<String, Object>> create(@RequestBody Map<String, Object> body) {
        Map<String, Object> result = new HashMap<>();
        result.put("success", true);
        result.put("message", "Created successfully");
        result.put("data", body);
        return Result.success(result);
    }

    @GetMapping("/health")
    public Result<String> health() {
        return Result.success("OK");
    }
}
