export class Project {
  constructor(projectName) {
    this.projectName = projectName;
    this.projectId = crypto.randomUUID();
    this.tasks = [];
  }

  addTask(task) {
    this.tasks.push(task);
  }
}
