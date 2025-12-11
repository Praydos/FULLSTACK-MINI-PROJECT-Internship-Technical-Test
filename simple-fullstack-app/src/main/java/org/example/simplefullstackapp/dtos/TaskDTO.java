package org.example.simplefullstackapp.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.simplefullstackapp.enums.Status;

import java.time.LocalDate;

@Data @NoArgsConstructor @AllArgsConstructor
public class TaskDTO {
    private Long id;
    private String title;
    private String description;
    private Status status;
    private LocalDate dueDate;
    private Long projectId;
}