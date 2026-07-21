import { Project } from "./project.js";

export const User = (() => {
  //initialize with default tasks.
  let projects = [new Project("My Tasks")];

  const addProject = (projectName) => {
    projects.push(new Project(projectName));
  };

  const addTaskToProject = (projectId, task) => {
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
    const projectsData = JSON.parse(userProfile);
    if (!projectsData) {
      console.log("no data to load");
      return 1;
    }
    projects = projectsData;
  };

  const saveData = () => {
    localStorage.setItem("user_profile", JSON.stringify(projects));
  };

  return {
    addProject,
    addTaskToProject,
    getProjects,
    loadData,
    saveData,
  };
})();
