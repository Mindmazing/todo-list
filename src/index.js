import "./css/reset.css";
import "./css/style.css";

import { Task } from "./js/task.js";
import { Project } from "./js/project.js";
import { UserInterface } from "./js/userInterface.js";
import { User } from "./js/user.js";

const main = (() => {
  // load user data and save to their projects
  User.loadData();

  // load data to website
  function reloadSideBar() {
    const sidebarProyects = document.querySelector(
      ".sidebar-projects-container",
    );
    sidebarProyects.innerHTML = null;
    for (let project of User.getProjects()) {
      //load projects to sidebar
      UserInterface.addProjectToSidebar(project);
      for (let task of project.tasks) {
        if (task.isChecked()) continue;
        UserInterface.addTaskToSidebarProject(task);
      }
    }
  }
  reloadSideBar();

  // load the default tasks view
  function loadProjectMainView(projectId) {
    // get project
    const project = User.findProject(projectId);
    UserInterface.showProjectOnMain(project);
  }
  loadProjectMainView("0000-0000-0000-0000");

  // event listeners for sidebar
  const sidebarAddProjectBtn = document.querySelector(".sidebar > button");
  sidebarAddProjectBtn.addEventListener("click", (event) => {
    UserInterface.showProjectFormPopUp();
  });

  // submit project creates a new project instace
  const addProjectForm = document.querySelector(".project-creator-modal form");
  addProjectForm.addEventListener("submit", (event) => {
    // get project submitted name save it to user and local storage and add to sidebar
    event.preventDefault();
    const formData = new FormData(event.target);
    const projectName = Object.fromEntries(formData);
    User.addProject(projectName["project-name"]);
    UserInterface.addProjectToSidebar(User.getProjects().at(-1));
    UserInterface.hideProjectFormPopUp();
    User.saveData();
  });
  // cancel operation in cancel button is clicked
  addProjectForm
    .querySelector(`button[type="button"]`)
    .addEventListener("click", () => {
      UserInterface.hideProjectFormPopUp();
    });
  // detect when add task button is pressed for any of the projects in sidebar
  const sidebarProjectsContainer = document.querySelector(
    ".sidebar-projects-container",
  );
  const mainProjectView = document.querySelector(".main_project-view");

  let selectedProjectId = "";
  sidebarProjectsContainer.addEventListener("click", (event) => {
    if (!event.target.matches(".sidebar-project_add-task")) return 1;
    // get project id
    selectedProjectId =
      event.target.parentElement.getAttribute("data-project-id");
    UserInterface.showTaskFormPopUp();
  });

  const addTaskForm = document.querySelector(".task-creator-modal form");
  addTaskForm.addEventListener("submit", (event) => {
    // get project submitted name save it to user and local storage and add to sidebar
    event.preventDefault();
    const formData = new FormData(event.target);
    const taskData = Object.fromEntries(formData);
    const newTask = new Task(
      taskData["task-title"],
      taskData["task-description"],
      taskData["task-duedate"],
      taskData["task-priority"],
      selectedProjectId,
    );
    // add task to user
    User.addTaskToProject(newTask);
    UserInterface.addTaskToSidebarProject(newTask);
    // add task to project main view if main view on focus
    if (selectedProjectId === mainProjectView.getAttribute("data-project-id")) {
      UserInterface.addTaskToProject(newTask);
    }
    // save JSON
    User.saveData();
    //close pop up
    UserInterface.hideTaskFormPopUp();
  });
  addTaskForm
    .querySelector(`button[type="button"]`)
    .addEventListener("click", () => {
      UserInterface.hideTaskFormPopUp();
    });

  // add event listener to select project to view in main window
  sidebarProjectsContainer.addEventListener(
    "click",
    (event) => {
      if (
        !event.target.parentElement.matches(".sidebar-project_name") &&
        !event.target.matches(".sidebar-project_name")
      )
        return 1;
      // get project id
      const projectId = event.target
        .closest(".sidebar-project")
        .getAttribute("data-project-id");
      loadProjectMainView(projectId);
    },
    true,
  );

  // add event listener to projects main view buttons
  const mainProjectViewAddBtn = document.querySelector(
    ".main_project-view .view-header_edit-button",
  );
  mainProjectViewAddBtn.addEventListener("click", (event) => {
    // get project Id
    selectedProjectId = event.target
      .closest(".main_project-view")
      .getAttribute("data-project-id");
    UserInterface.showTaskFormPopUp();
  });

  // add event listener to check task
  const projectViewTasksContainer = document.querySelector(
    ".project-view_tasks-container",
  );
  projectViewTasksContainer.addEventListener("click", (event) => {
    const taskCheckbox = event.target.closest(".task-card_checkbox");
    if (!taskCheckbox) return 1;
    const taskId = taskCheckbox.parentElement.getAttribute("data-task-id");
    const projectId = taskCheckbox
      .closest(".main_project-view")
      .getAttribute("data-project-id");
    const taskSelected = User.findTask(projectId, taskId);
    // set dom to checked status
    if (taskCheckbox.classList.contains("task-card_checkbox_checked-state")) {
      taskCheckbox.classList.remove("task-card_checkbox_checked-state");
      // remove check from card
      taskCheckbox.querySelector("input").checked = false;
      taskSelected.unCheck();
    } else {
      taskCheckbox.classList.add("task-card_checkbox_checked-state");
      taskCheckbox.querySelector("input").checked = true;
      taskSelected.check();
    }
    // save check movements
    reloadSideBar();
    User.saveData();
  });
})();
