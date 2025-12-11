package org.example.simplefullstackapp.services;

import lombok.RequiredArgsConstructor;
import org.example.simplefullstackapp.dtos.ProjectDTO;
import org.example.simplefullstackapp.dtos.ProgressDTO;
import org.example.simplefullstackapp.entities.Project;
import org.example.simplefullstackapp.enums.Status;
import org.example.simplefullstackapp.mappers.ProjectMapper;
import org.example.simplefullstackapp.repositories.ProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final ProjectMapper projectMapper;

    public ProjectDTO createProject(Project project) {
        Project savedProject = projectRepository.save(project);
        return projectMapper.toSimpleDto(savedProject);
    }

    public List<ProjectDTO> getAllProjects() {
        List<Project> projects = (List<Project>) projectRepository.findAll();
        return projects.stream()
                .map(projectMapper::toDtoWithProgress)
                .collect(Collectors.toList());
    }

    public ProjectDTO getProjectById(Long id) {
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        return projectMapper.toFullDto(project);
    }

    public ProjectDTO updateProject(Long id, Project updated) {
        Project existing = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        existing.setTitle(updated.getTitle());
        existing.setDescription(updated.getDescription());

        Project savedProject = projectRepository.save(existing);
        return projectMapper.toSimpleDto(savedProject);
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }

    public ProgressDTO getProgress(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        int total = project.getTasks().size();
        int completed = (int) project.getTasks().stream()
                .filter(t -> t.getStatus() == Status.COMPLETED)
                .count();
        double percentage = total == 0 ? 0 : (completed * 100.0 / total);

        return new ProgressDTO(total, completed, percentage);
    }
}