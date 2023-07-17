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

  constructor(private taskService: TaskService) {

  }

  ngOnInit() {
    this._task = Object.assign({}, this.task);
  }

  updateTask(task: any) {
    this.taskService.updateTask(task);
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

}
