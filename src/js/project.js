export class Project {
  #tasks = [];
  #projectId = crypto.randomUUID();

  constructor(projectName) {
    this.projectName = projectName;
  }

  addTask(task) {
    this.#tasks.push(task);
  }
  getTasks() {
    return this.#tasks;
  }

  get projectId() {
    return this.#projectId;
  }
}
