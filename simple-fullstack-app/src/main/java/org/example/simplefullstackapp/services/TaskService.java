package org.example.simplefullstackapp.services;

import lombok.RequiredArgsConstructor;
import org.example.simplefullstackapp.dtos.TaskDTO;
import org.example.simplefullstackapp.entities.Project;
import org.example.simplefullstackapp.entities.Task;
import org.example.simplefullstackapp.enums.Status;
import org.example.simplefullstackapp.mappers.TaskMapper;
import org.example.simplefullstackapp.repositories.ProjectRepository;
import org.example.simplefullstackapp.repositories.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;



import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class TaskService {

    private final TaskRepository taskRepository;
    private final ProjectRepository projectRepository;
    private final TaskMapper taskMapper;

    public TaskDTO createTask(Long projectId, Task task) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        task.setProject(project);
        Task savedTask = taskRepository.save(task);
        return taskMapper.toDto(savedTask);
    }

    public List<TaskDTO> getTasksByProject(Long projectId) {
        // Use the repository query method you'll add
        List<Task> tasks = taskRepository.findByProjectId(projectId);
        return tasks.stream()
                .map(taskMapper::toDto)
                .collect(Collectors.toList());
    }

    public TaskDTO updateTask(Long taskId, Task updated) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setTitle(updated.getTitle());
        task.setDescription(updated.getDescription());
        task.setDueDate(updated.getDueDate());
        task.setStatus(updated.getStatus());

        Task savedTask = taskRepository.save(task);
        return taskMapper.toDto(savedTask);
    }

    public TaskDTO markCompleted(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        task.setStatus(Status.COMPLETED);

        Task completedTask = taskRepository.save(task);
        return taskMapper.toDto(completedTask);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}
