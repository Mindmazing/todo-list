import "./css/reset.css";
import "./css/style.css";

import { Task } from "./js/task.js";
import { Project } from "./js/project.js";

import { UserInterface } from "./js/userInterface.js";
import { User } from "./js/user.js";

const mainScript = (() => {
  User.addProject("Nigger");
  User.addProject("Cunt");
  User.addProject("The Fucking Cunt");

  for (let project of User.getProjects()) {
    UserInterface.addProjectToSidebar(project);
  }
})();
