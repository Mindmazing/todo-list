export class Task {
  constructor(title, description, dueDate, priority, projectId) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.projectId = projectId;
    this.priority = priority;
    this.taskId = crypto.randomUUID();
    this.checked = false;
  }
  isChecked() {
    return this.checked;
  }

  check() {
    this.checked = true;
  }
}
