import { Project } from "./project.js";

export const User = (() => {
  //initialize with default tasks.
  const projects = [new Project("My Tasks")];

  const addProject = (project) => {
    projects.push(new Project(project));
  };

  const addTask = (projectId, task) => {
    // search for project with Id
    for (let project of projects) {
      if (project.projectId === projectId) {
        project.addTask(task);
        break;
      }
    }
  };

  const getProjects = () => {
    return projects;
  };

  const loadData = () => {
    const userProfile = localStorage.getItem("user_profile");
    projects = JSON.parse(userProfile);
  };

  const saveData = () => {
    localStorage.setItem("user_profile", JSON.stringify(projects));
  };

  return {
    addProject,
    addTask,
    getProjects,
    loadData,
    saveData,
  };
})();
