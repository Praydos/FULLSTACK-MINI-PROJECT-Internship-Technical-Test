package org.example.simplefullstackapp.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor
@AllArgsConstructor
public class ProgressDTO {
    private int totalTasks;
    private int completedTasks;
    private double progressPercentage;
}