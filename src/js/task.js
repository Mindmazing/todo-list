export class Task {
  #checked = false;
  #taskId = crypto.randomUUID();

  constructor(title, description, dueDate, priority, projectId) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.projectId = projectId;
    this.priority = priority;
  }

  isChecked() {
    return this.checked;
  }

  check() {
    this.#checked = true;
  }

  get taskId() {
    return this.taskId;
  }
}
