export class Task {
  #checked = false;
  #taskId = crypto.randomUUID();

  constructor(title, description, dueDate, priority, project) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.project = project;
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
