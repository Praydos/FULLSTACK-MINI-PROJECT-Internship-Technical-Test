package org.example.simplefullstackapp.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@NoArgsConstructor @AllArgsConstructor @Getter @Setter
@ToString(exclude = "tasks")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    @OneToMany(
            mappedBy = "project",
            fetch = FetchType.LAZY,
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JsonIgnore // Prevent infinite recursion
    private List<Task> tasks = new ArrayList<>();

    // Helper method
    public void addTask(Task task) {
        tasks.add(task);
        task.setProject(this);
    }
}

