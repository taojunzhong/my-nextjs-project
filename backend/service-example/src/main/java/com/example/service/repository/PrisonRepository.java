package com.example.service.repository;

import com.example.common.entity.PrisonEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PrisonRepository extends JpaRepository<PrisonEntity, Long> {
    Optional<PrisonEntity> findByPrisonNumber(String prisonNumber);
    
    List<PrisonEntity> findByStatus(Integer status);
    
    List<PrisonEntity> findByDeleted(Integer deleted);
    
    boolean existsByPrisonNumber(String prisonNumber);
}
