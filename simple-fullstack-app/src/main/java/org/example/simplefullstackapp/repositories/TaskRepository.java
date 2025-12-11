package org.example.simplefullstackapp.repositories;

import org.example.simplefullstackapp.entities.Task;
import org.example.simplefullstackapp.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByProjectId(Long projectId);
    Long countByProjectIdAndStatus(Long projectId, Status status);
    Long countByProjectId(Long projectId);

}
