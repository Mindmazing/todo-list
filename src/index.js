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
})();
