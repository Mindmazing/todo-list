export class Project {
  #tasks = [];

  constructor(projectName) {
    this.projectName = projectName;
    this.projectId = crypto.randomUUID();
  }

  addTask(task) {
    this.#tasks.push(task);
  }
  getTasks() {
    return this.#tasks;
  }
}
