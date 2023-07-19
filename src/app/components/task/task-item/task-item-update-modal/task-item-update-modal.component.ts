import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-task-item-update-modal',
  templateUrl: './task-item-update-modal.component.html',
  styleUrls: ['./task-item-update-modal.component.scss']
})
export class TaskItemUpdateModalComponent {

  @Input() task: any;
  @Output() _deleteTask = new EventEmitter;

  _task: any;
  currentDate: any;
  taskDueDate: any;

  constructor(private taskService: TaskService) {

  }

  ngOnInit() {
    this._task = Object.assign({}, this.task);
    this.getCurrentDate();
    this.getTaskDueDate();
  }

  updateTask(task: any) {
    if (this.taskDueDate) {
      const [year, month, day] = this.taskDueDate.split('-');
      task.taskDueDate = new Date(new Date(+year, month - 1, day));
    }
    this.taskService.updateTask(task);

    if (!task.status) {
      //this.scrollToTop();
    }
  }

  deleteTask(task: any) {
    this._deleteTask.emit(task);
  }

  autoSizeTextareaTitle() {
    const doc = document.getElementById('taskTitleEdit' + this._task.id)!;

    doc.style.height = "0px";
    doc.style.height = (doc.scrollHeight + 25) + "px";
  }

  autoSizeTextareaDescription() {
    const doc = document.getElementById('taskDescriptionEdit' + this._task.id)!;

    doc.style.height = "0px";
    doc.style.height = (doc.scrollHeight + 25) + "px";
  }

  getTaskDueDate() {
    if (this._task.taskDueDate) {
      const date = new Date(this._task.taskDueDate.seconds * 1000);
      this.taskDueDate = new Date(date).toISOString().split('T')[0];

      this._task.taskDueDate = new Date(this._task.taskDueDate?.seconds * 1000).toISOString().split('T')[0];
    }
  }

  getCurrentDate() {
    const date = new Date();
    this.currentDate = date;
  }

  onChangeDate(e: any) {
    this._task.taskDueDate = new Date(e);
  }

  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}
