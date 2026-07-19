export function User() {
  const projects = [];

  const addProject = (project) => {
    projects.push(project);
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

  return {
    addProject,
    addTask,
    getProjects,
  };
}
