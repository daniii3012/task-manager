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
  @Input() selectedCategory: any;
  //@Output() updateTask = new EventEmitter;
  //@Output() deleteTask = new EventEmitter;

  _showNotes: boolean = false;

  currentDate: any;
  _currentDate = new Date();

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService
  ) {
  }

  ngOnInit() {
    this.getCurrentDate();
    //console.log(this.task.id);
  }

  updateTask(task: any) {
    //this.updateTask.emit(task);
    if (task.catId) {
      this.categoryService.updateUnfinishedCount(task.catId, task.status);
    }
    this.taskService.updateTaskStatus(task, !task.status);

    if(task.status) {
      //this.scrollToTop();
    }
  }

  deleteTask(task: any) {
    //this.deleteTask.emit(task);
    if (task.catId) {
      if (!task.status) {
        this.categoryService.updateUnfinishedCount(task.catId, false);
      }
      this.categoryService.updateTaskCount(task.catId, false);
    }
    this.taskService.deleteTask(task);

    //this.scrollToTop();
  }

  showNotes() {
    this._showNotes = !this._showNotes;
  }

  getCurrentDate() {
    this._currentDate.setDate(this._currentDate.getDate() - 1);
    this.currentDate = this._currentDate.getTime() / 1000;
  }

  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

}
