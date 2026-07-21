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
  for (let project of User.getProjects()) {
    //load projects to sidebar
    UserInterface.addProjectToSidebar(project);
    for (let task of project.tasks) {
      UserInterface.addTaskToSidebarProject(task);
    }
  }

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
  sidebarProjectsContainer.addEventListener("click", (event) => {
    if (!event.target.matches(".sidebar-project_add-task")) return 1;
    // get project id
    const projectId =
      event.target.parentElement.getAttribute("data-project-id");
    // TEST: SETTING A TASK TO A PROJECT
    const newTask = new Task(
      "Test Task",
      "This is my test task",
      "12/12/12",
      "HIGH",
      projectId,
    );
    // add task to user
    User.addTaskToProject(newTask);
    UserInterface.addTaskToSidebarProject(newTask);
    // save JSON
    User.saveData();
  });
})();
