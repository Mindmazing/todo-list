export const UserInterface = (() => {
  // Document Objects
  const mainProjectTitle = document.querySelector(
    ".main_project-view .view-header h2",
  );
  const mainProjectTasksContainer = document.querySelector(
    ".project-view_tasks-container",
  );
  const sidebarProjectsContainer = document.querySelector(
    ".sidebar-projects-container",
  );

  function createProyectSidebarCard(project) {
    const projectSideBarCard = document.createElement("div");
    projectSideBarCard.setAttribute("data-project-id", project.projectId);
    projectSideBarCard.classList.add("sidebar-project");
    projectSideBarCard.innerHTML = `
         <div class="sidebar-project_name">
              <span>${project.projectName}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 17h10M9 12h10M9 7h10M5.002 17v.002H5V17zm0-5v.002H5V12zm0-5v.002H5V7z"
                />
              </svg>
            </div>
            <div class="sidebar-project_tasks-container">
            </div>
            <button class="sidebar-project_add-task">
              Add Task
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 12h6m0 0h6m-6 0v6m0-6V6"
                />
              </svg>
            </button>
  `;
    return projectSideBarCard;
  }

  function createTaskCard(task) {
    let taskCard = document.createElement("div");
    taskCard.setAttribute("data-task-id", task.taskId);
    taskCard.classList.add("project-view_task-card");
    taskCard.innerHTML = `
              <h3>${task.title}</h3>
              <hr />
              <p>
                ${task.description}
              </p>
              <hr />
              <div class="task-card_checkbox">
                <input type="checkbox" value="task-completed" />
                <p>In Progress</p>
              </div>
  `;
    return taskCard;
  }

  const setProjectTitle = (title) => {
    mainProjectTitle.textContent = title;
  };

  const addTaskToProject = (task) => {
    mainProjectTasksContainer.appendChild(createTaskCard(task));
  };

  const addProjectToSidebar = (project) => {
    sidebarProjectsContainer.appendChild(createProyectSidebarCard(project));
  };

  return {
    setProjectTitle,
    addTaskToProject,
    addProjectToSidebar,
  };
})();

export function createTaskCard(task) {
  let taskCard = document.createElement("div");
  taskCard.setAttribute("data-task-id", task.taskId);
  taskCard.classList.add("project-view_task-card");
  taskCard.innerHTML = `
              <h3>${task.title}</h3>
              <hr />
              <p>
                ${task.description}
              </p>
              <hr />
              <div class="task-card_checkbox">
                <input type="checkbox" value="task-completed" />
                <p>In Progress</p>
              </div>
  `;
  return taskCard;
}
