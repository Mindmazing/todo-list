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

  const createSidebarTaskCard = (task) => {
    const sidebarTaskCard = document.createElement("div");
    sidebarTaskCard.classList.add("sidebar-project_task");
    sidebarTaskCard.setAttribute("data-task-id", task.taskId);
    sidebarTaskCard.innerHTML = `
                <p>This is a Task ${task.title}</p>
                <button>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    fill="none"
                    viewBox="-2.4 -2.4 28.8 28.8"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 6v11.8c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874c.427.218.987.218 2.105.218h5.606c1.118 0 1.677 0 2.104-.218.377-.192.683-.498.875-.874.218-.428.218-.987.218-2.105V6M6 6h2M6 6H4m4 0h8M8 6c0-.932 0-1.398.152-1.765a2 2 0 0 1 1.082-1.083C9.602 3 10.068 3 11 3h2c.932 0 1.398 0 1.765.152a2 2 0 0 1 1.083 1.083C16 4.602 16 5.068 16 6m0 0h2m0 0h2"
                    />
                  </svg>
                </button>
    `;
  };

  const addTaskToSidebarProject = (projectId, task) => {
    let sidebarProjectTasksContainer = sidebarProjectsContainer.querySelector(
      `[data-proyect-id="${projectId}"] .sidebar-project_tasks-container`,
    );
    sidebarProjectTasksContainer.appendChild(createSidebarTaskCard(task));
  };

  return {
    setProjectTitle,
    addTaskToProject,
    addProjectToSidebar,
  };
})();
