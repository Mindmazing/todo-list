import "./css/reset.css";
import "./css/style.css";

import { Task } from "./js/task.js";
import { Project } from "./js/project.js";

import {
  UserInterface,
  createProyectSidebarCard,
  createTaskCard,
} from "./js/userInterface.js";
import { User } from "./js/user.js";

const user = User();

const newProject = new Project("Roblox Game");
user.addProject(newProject);
const newTask = new Task(
  "Build Lua Components",
  "Build lua shit with that and this",
  "12/12/12",
  newProject.projectId,
  "HIGH",
);
user.addTask(newTask.projectId, newTask);

console.log(user.getProjects()[0]);
