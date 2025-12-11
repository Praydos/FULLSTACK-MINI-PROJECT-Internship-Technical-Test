package org.example.simplefullstackapp;

import lombok.RequiredArgsConstructor;
import org.example.simplefullstackapp.entities.Project;
import org.example.simplefullstackapp.entities.Task;
import org.example.simplefullstackapp.enums.Status;
import org.example.simplefullstackapp.repositories.ProjectRepository;
import org.example.simplefullstackapp.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;
import java.util.List;

@SpringBootApplication
@RequiredArgsConstructor
public class SimpleFullstackAppApplication {

    private final ProjectRepository projectRepository;

    private final TaskRepository taskRepository;

    public static void main(String[] args) {
        SpringApplication.run(SimpleFullstackAppApplication.class, args);
    }

    @Bean
    public CommandLineRunner initData() {
        return args -> {

            // ---- Project 1 ----
            Project p1 = new Project();
            p1.setTitle("Spring Boot Backend");
            p1.setDescription("Mini fullstack project for internship test");
            projectRepository.save(p1);

            Task t1 = new Task();
            t1.setTitle("Create Project Entity");
            t1.setDescription("Define fields + relationship + annotations");
            t1.setDueDate(LocalDate.now().plusDays(3));
            t1.setStatus(Status.COMPLETED);
            t1.setProject(p1);

            Task t2 = new Task();
            t2.setTitle("Create Task Entity");
            t2.setDescription("Add enum, date, relations");
            t2.setDueDate(LocalDate.now().plusDays(5));
            t2.setStatus(Status.IN_PROGRESS);
            t2.setProject(p1);

            taskRepository.saveAll(List.of(t1, t2));


            // ---- Project 2 ----
            Project p2 = new Project();
            p2.setTitle("Frontend Application");
            p2.setDescription("React app consuming the backend API");
            projectRepository.save(p2);

            Task t3 = new Task();
            t3.setTitle("Setup React Project");
            t3.setDescription("Initialize Vite project with Tailwind");
            t3.setDueDate(LocalDate.now().plusDays(2));
            t3.setStatus(Status.IN_PROGRESS);
            t3.setProject(p2);

            Task t4 = new Task();
            t4.setTitle("Create Login Page");
            t4.setDescription("Basic login UI before auth integration");
            t4.setDueDate(LocalDate.now().plusDays(4));
            t4.setStatus(Status.IN_PROGRESS);
            t4.setProject(p2);

            taskRepository.saveAll(List.of(t3, t4));


            System.out.println("✅ Sample data inserted into H2 database successfully!");
        };
    }





}
