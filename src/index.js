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
    UserInterface.addProjectToSidebar(project);
  }

  // event listeners for sidebar
  const sidebarAddProjectBtn = document.querySelector(".sidebar > button");
  sidebarAddProjectBtn.addEventListener("click", (event) => {
    UserInterface.showProjectFormPopUp();
  });

  // submit add project form listener
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
  addProjectForm
    .querySelector(`button[type="button"]`)
    .addEventListener("click", () => {
      UserInterface.hideProjectFormPopUp();
    });
})();
