# Authentication & Landing Page
## login page 

<img width="1755" height="1127" alt="image" src="https://github.com/user-attachments/assets/f2aa3530-2fe8-4121-b30d-d51919c94672" />

Key Features:
- User Sign-In: A secure login portal where registered users can access their personalized project dashboards.

- Demo Access: To facilitate immediate exploration, the page includes pre-configured demo credentials, allowing users to test the application’s functionality without the need for a full registration process.

- Navigation: A clean top navigation bar provides quick links to "Login" and "Register" actions, maintaining a consistent UI across the app.

- Responsive Design: The interface uses a soft, modern color palette (Indigo and Slate) with a centered card layout, ensuring clarity and focus on the primary task.


## register page

<img width="1755" height="1232" alt="image" src="https://github.com/user-attachments/assets/d58bf43a-d3fe-44b0-9780-8c5583d009f3" />

Key Features:
- Comprehensive Profile Initialization: Captures essential user data including full name and email address to personalize the dashboard experience.

- Enhanced Security Protocol: Implements a multi-step password verification process—requiring a minimum of 6 characters and a confirmation field—to ensure account integrity and prevent entry errors.

- Direct Account Linking: Includes a "Sign in here" redirect at the base of the form to facilitate quick navigation for existing users who may have landed on the registration page by mistake.



## Dashboard 
<img width="1755" height="849" alt="image" src="https://github.com/user-attachments/assets/c9147a7a-87f3-42c9-8a64-08c981b7a7b8" />

Key Features:
- Centralized Project Repository: Displays all user-created projects in a structured grid, allowing for rapid scanning of active workstreams.

- Dynamic Progress Tracking: Each project features a real-time progress bar that calculates completion based on the ratio of finished tasks to total tasks (e.g., "1 of 2 tasks completed").

- Project Metadata: Provides essential context at a glance, including project titles and concise descriptions to distinguish between different work scopes.

- CRUD Operations: Integrated action icons allow users to seamlessly Edit or Delete existing projects directly from the dashboard view.

- Primary Action Entry: A prominent "+ Create Project" call-to-action (CTA) ensures the workflow for starting new initiatives is always accessible.

## Operations on projects 

### Project Creation & Initialization
<img width="1753" height="652" alt="image" src="https://github.com/user-attachments/assets/dfb214ef-6996-416e-8c11-924e66687f7e" />


Key Features:
- Structured Data Entry: Provides dedicated input fields for a Project Title and an Optional Description, allowing users to categorize and detail the scope of their work.

- Intuitive Workflow: Features a clean, card-based form that appears within the dashboard context, minimizing navigation friction.

- Instant Integration: Once the user clicks the "Add Project" button, the project is dynamically saved and added to the user's dashboard for immediate task management.

- Flexible Controls: Includes clear "Cancel" options—both at the form level and the page level—to allow users to exit the creation flow without saving changes.

- result : </br>
  <img width="552" height="245" alt="image" src="https://github.com/user-attachments/assets/f8635f76-87cc-47a0-bdb2-aa33a0e34caa" />

### Project Modification
<img width="1717" height="775" alt="image" src="https://github.com/user-attachments/assets/efe38094-339b-40d8-a5ae-856a07610e57" />


The Project Modification interface allows users to refine and update their project parameters, ensuring that the dashboard remains an accurate reflection of their evolving workflows.

Key Features:
 - Contextual Data Retrieval: When a user selects the "Edit" icon (represented by the blue compose icon) on a project card, the system automatically populates the form with existing project data, such as titles and descriptions.

- Streamlined Updates: Users can modify the Project Title and Description (Optional) within a focused interface, maintaining data continuity while allowing for scope changes.

- Asynchronous Updating: Clicking the "Update Project" action saves changes and immediately reflects those updates across the dashboard's project grid.

- Destructive Action Guard: The dashboard includes a dedicated "Delete" icon (represented by the red trash icon) on each card, allowing for the permanent removal of obsolete workstreams.

- result : </br>
    <img width="543" height="266" alt="image" src="https://github.com/user-attachments/assets/efaba477-abb7-41e1-b302-d4dcc6f5159e" />


## Project Details : 
Selecting a project title transitions the user from the high-level dashboard to a dedicated management suite. This view provides an exhaustive breakdown of the project's internal workflow and real-time completion metrics.
<img width="1755" height="1055" alt="image" src="https://github.com/user-attachments/assets/3a4841fd-4e45-4826-b44e-6c8f9487aae9" />

Key Features:
- Aggregated Progress Analytics: Features a prominent Overall Progress dashboard that visualizes the completion percentage (e.g., 50%) via a synchronized progress bar. This metric is supported by specific data points indicating the number of completed tasks versus total tasks.

- Dynamic Task Creation: Includes a structured "Add New Task" interface within the sidebar, allowing for immediate entry of task Titles, detailed Descriptions, and specific Due Dates.

- Task Lifecycle Management: Each individual task card displays its current lifecycle stage—such as Completed (green) or In Progress (yellow)—providing instant visual status updates.

- Inline Operational Controls: Every task is equipped with management icons to Edit task details, toggle status (via a completion checkmark), or Delete the task entirely.





## operations on tasks 
### Create a new task : 
<img width="560" height="594" alt="image" src="https://github.com/user-attachments/assets/a500ac5e-fce8-4ce8-a35e-90611dc15cc4" />


Key Features:
- Detailed Task Definition: Captures three essential data points for every work item: a mandatory Title, a comprehensive Description, and a specific Due Date.

- Deadline Management: Features an integrated date picker to help users set accurate timelines, ensuring project milestones are met on schedule.

- Immediate Project Impact: Upon clicking the "Create Task" button, the new item is instantly added to the project’s task list and dynamically updates the project's Overall Progress metrics.

- Safety Controls: A "Cancel" option is provided to discard the task-in-progress, preventing the accidental creation of incomplete or placeholder items.
- result : </br>
<img width="1755" height="1055" alt="image" src="https://github.com/user-attachments/assets/b43a25b9-b8b7-4898-9345-b18a12b8d961" />
after creating a new task the progress will be updated.

### Task Modification
<img width="1755" height="606" alt="image" src="https://github.com/user-attachments/assets/548bd21c-0de3-4996-a967-ede6382f2b7e" />

Key Features:
- Contextual Edit Suite: By selecting the edit icon on a specific task card, the system populates a dedicated Edit Task form with existing data, including the title, description, and scheduled due date.

- Real-Time Data Synchronization: Users can modify any task attribute—such as updating a title to "New task Updated"—and save changes via the "Update Task" action. These updates are immediately reflected in the task list to maintain a "single source of truth" for the project.

- Interactive Status Transitions: Users can manage a task's lifecycle through dedicated status indicators:

- Completed: Represented by a green checkmark and badge, indicating the task is finalized.

- In Progress: Represented by an amber badge and an open circle, signifying active work.

- Integrated Task Deletion: A red trash icon on each task card provides a streamlined method for removing obsolete or redundant tasks from the project scope.

### progress update 
if we marked the tasks as completed the progress bar will be updating automatically as well when we create a new task the amount of task will change so the progress. 
<img width="1755" height="1055" alt="image" src="https://github.com/user-attachments/assets/0de13675-3361-4604-9484-68142e90bdda" />

<img width="571" height="284" alt="image" src="https://github.com/user-attachments/assets/bd86c7ca-3274-40fe-af45-131110657a27" />


Automated Progress Synchronization
- The application employs a dynamic calculation logic to maintain an accurate visual representation of project health:

- Task Status Integration: Mark a task as Completed via the status toggle, and the Overall Progress bar immediately recalculates to reflect the new completion percentage.

- Dynamic Denominator Tracking: When a user adds a new task, the system automatically increments the "Total Tasks" count, which simultaneously adjusts the progress percentage to account for the expanded project scope.

- Visual Completion Cues: Completed tasks are clearly distinguished by a green badge and a checked icon, while the progress bar uses a high-contrast indigo fill to show current advancement.






