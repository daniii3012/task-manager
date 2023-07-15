import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {

  @Input() task: any;
  @Output() updateTask = new EventEmitter;
  @Output() deleteTask = new EventEmitter;

  constructor(private taskService: TaskService) {
  }

  _updateTask(task: any) {
    this.updateTask.emit(task);
    //this.taskService.updateTask(task, status);
  }

  _deleteTask(task: any) {
    this.deleteTask.emit(task);
    //this.taskService.deleteTask(task);
  }

}
