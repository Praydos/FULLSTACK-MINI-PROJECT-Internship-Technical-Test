package org.example.simplefullstackapp.services;

import lombok.RequiredArgsConstructor;
import org.example.simplefullstackapp.dtos.ProjectDTO;
import org.example.simplefullstackapp.dtos.ProgressDTO;
import org.example.simplefullstackapp.entities.Project;
import org.example.simplefullstackapp.entities.User;
import org.example.simplefullstackapp.enums.Status;
import org.example.simplefullstackapp.mappers.ProjectMapper;
import org.example.simplefullstackapp.repositories.ProjectRepository;
import org.springframework.security.access.AccessDeniedException;
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
    private final AuthService authService;

    public ProjectDTO createProject(Project project) {
        User currentUser = authService.getCurrentUser();
        project.setUser(currentUser);

        Project savedProject = projectRepository.save(project);
        return projectMapper.toSimpleDto(savedProject);
    }

    public List<ProjectDTO> getAllProjects() {
        User currentUser = authService.getCurrentUser();
        List<Project> projects = projectRepository.findByUserId(currentUser.getId());

        return projects.stream()
                .map(projectMapper::toDtoWithProgress)
                .collect(Collectors.toList());
    }

    public ProjectDTO getProjectById(Long id) {
        User currentUser = authService.getCurrentUser();
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        // Check ownership
        if (!project.getUser().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("You don't have access to this project");
        }

        return projectMapper.toFullDto(project);
    }

    public ProjectDTO updateProject(Long id, Project updated) {
        User currentUser = authService.getCurrentUser();
        Project existing = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        // Check ownership
        if (!existing.getUser().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("You don't have access to this project");
        }

        existing.setTitle(updated.getTitle());
        existing.setDescription(updated.getDescription());

        Project savedProject = projectRepository.save(existing);
        return projectMapper.toSimpleDto(savedProject);
    }

    public void deleteProject(Long id) {
        User currentUser = authService.getCurrentUser();
        Project project = projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        // Check ownership
        if (!project.getUser().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("You don't have access to this project");
        }

        projectRepository.deleteById(id);
    }

    public ProgressDTO getProgress(Long projectId) {
        User currentUser = authService.getCurrentUser();
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        // Check ownership
        if (!project.getUser().getId().equals(currentUser.getId())) {
            throw new AccessDeniedException("You don't have access to this project");
        }

        int total = project.getTasks().size();
        int completed = (int) project.getTasks().stream()
                .filter(t -> t.getStatus() == Status.COMPLETED)
                .count();
        double percentage = total == 0 ? 0 : (completed * 100.0 / total);

        return new ProgressDTO(total, completed, percentage);
    }
}