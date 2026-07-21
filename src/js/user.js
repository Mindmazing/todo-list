import { Project } from "./project.js";
import { Task } from "./task.js";

export const User = (() => {
  //initialize with default tasks.
  let projects = [new Project("My Tasks")];
  // initializing my tasks project with an accessible ID
  projects[0].projectId = "0000-0000-0000-0000";

  const addProject = (projectName) => {
    projects.push(new Project(projectName));
  };

  const addTaskToProject = (task) => {
    // search for project with Id
    for (let project of projects) {
      if (project.projectId === task.projectId) {
        console.log(project);
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
    console.log(userProfile);
    const projectsData = JSON.parse(userProfile);
    if (!projectsData) {
      console.log("no data to load");
      return 1;
    }

    projects = projectsData.map((element) => {
      const project = new Project(element.projectName);
      project.projectId = element.projectId;
      project.tasks = element.tasks.map((element) => {
        const task = new Task(
          element.title,
          element.description,
          element.dueDate,
          element.priority,
          element.projectId,
        );
        task.taskId = element.taskId;
        task.checked = element.checked;
        return task;
      });
      return project;
    });
  };

  const saveData = () => {
    localStorage.setItem("user_profile", JSON.stringify(projects));
    console.log(localStorage.getItem("user_profile"));
  };

  const findProject = (projectId) => {
    for (let project of projects) {
      if (project.projectId === projectId) {
        return project;
      }
    }
  };

  return {
    addProject,
    addTaskToProject,
    getProjects,
    loadData,
    saveData,
    findProject,
  };
})();
