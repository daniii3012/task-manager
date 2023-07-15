import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryService } from 'src/app/services/task/category/category.service';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {

  @Input() task: any;
  //@Output() updateTask = new EventEmitter;
  //@Output() deleteTask = new EventEmitter;

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService
  ) {
  }

  /*
  changeList(e: any) {
    //console.log("change");
    this.updateTask(this.task);
  }
  */

  updateTask(task: any, status: boolean) {
    //this.updateTask.emit(task);
    this.taskService.updateTask(task, status);
  }

  deleteTask(task: any) {
    //this.deleteTask.emit(task);
    if (task.catId) {
      this.categoryService.updateTaskCategory(task.catId, false);
    }
    this.taskService.deleteTask(task);
  }

}
