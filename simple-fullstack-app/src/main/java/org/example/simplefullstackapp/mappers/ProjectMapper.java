package org.example.simplefullstackapp.mappers;


import org.example.simplefullstackapp.dtos.ProjectDTO;
import org.example.simplefullstackapp.dtos.TaskDTO;
import org.example.simplefullstackapp.dtos.ProgressDTO;
import org.example.simplefullstackapp.entities.Project;
import org.example.simplefullstackapp.entities.Task;
import org.example.simplefullstackapp.enums.Status;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class ProjectMapper {

    @Autowired
    private TaskMapper taskMapper;

    public ProjectDTO toSimpleDto(Project project) {
        if (project == null) {
            return null;
        }

        ProjectDTO dto = new ProjectDTO();
        dto.setId(project.getId());
        dto.setTitle(project.getTitle());
        dto.setDescription(project.getDescription());

        return dto;
    }

    public Project toEntity(ProjectDTO dto) {
        if (dto == null) {
            return null;
        }

        Project project = new Project();
        project.setId(dto.getId());
        project.setTitle(dto.getTitle());
        project.setDescription(dto.getDescription());

        return project;
    }

    public ProjectDTO toDtoWithTasks(Project project) {
        ProjectDTO dto = toSimpleDto(project);

        if (project.getTasks() != null && !project.getTasks().isEmpty()) {
            List<TaskDTO> taskDTOs = project.getTasks().stream()
                    .map(taskMapper::toDto)
                    .collect(Collectors.toList());
            dto.setTasks(taskDTOs);
        }

        return dto;
    }

    public ProjectDTO toDtoWithProgress(Project project) {
        ProjectDTO dto = toSimpleDto(project);

        if (project.getTasks() != null) {
            int total = project.getTasks().size();
            int completed = (int) project.getTasks().stream()
                    .filter(task -> task.getStatus() == Status.COMPLETED)
                    .count();
            double percentage = total == 0 ? 0 : (completed * 100.0 / total);

            ProgressDTO progress = new ProgressDTO(total, completed, percentage);
            dto.setProgress(progress);
        }

        return dto;
    }

    public ProjectDTO toFullDto(Project project) {
        ProjectDTO dto = toSimpleDto(project);

        // Add tasks
        if (project.getTasks() != null && !project.getTasks().isEmpty()) {
            List<TaskDTO> taskDTOs = project.getTasks().stream()
                    .map(taskMapper::toDto)
                    .collect(Collectors.toList());
            dto.setTasks(taskDTOs);
        }

        // Add progress
        if (project.getTasks() != null) {
            int total = project.getTasks().size();
            int completed = (int) project.getTasks().stream()
                    .filter(task -> task.getStatus() == Status.COMPLETED)
                    .count();
            double percentage = total == 0 ? 0 : (completed * 100.0 / total);

            ProgressDTO progress = new ProgressDTO(total, completed, percentage);
            dto.setProgress(progress);
        }

        return dto;
    }
}