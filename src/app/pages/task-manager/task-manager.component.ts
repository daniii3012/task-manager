import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TaskCategorySelectionComponent } from 'src/app/components/task/task-category-selection/task-category-selection.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CategoryService } from 'src/app/services/task/category/category.service';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss']
})
export class TaskManagerComponent {

  user: any;

  tasks: any;
  taskSubscription: any;

  //
  // deprecated for bad optimization
  //
  /* 
  unfinishedTasks: any;
  unfinishedTaskSubscription: any;
  finishedTasks: any;
  finishedTaskSubscription: any;
  */

  selectedCategory: any;
  categories: any;
  categorySubscription: any;

  finished: boolean = true;

  constructor(
    private authService: AuthService,
    private taskService: TaskService
  ) {
  }

  ngOnInit() {
    this.isLogged();
    this.getUser();
    this.getAllTasks();
  }

  isLogged() {
    return this.authService.isLogged();
  }

  getUser() {
    if (this.isLogged()) {
      this.user = this.authService.getUser();
    }
  }

  getAllTasks() {
    if (!this.taskSubscription) {
      this.taskSubscription = this.taskService.getTaskByUser(this.user.uid).subscribe(
        data => {
          this.tasks = data;
          console.log(data);
          console.log(this.taskSubscription);
        }
      );
    }
        

    //
    // deprecated for bad optimization
    //
    /*
    if (this.unfinishedTaskSubscription)
      this.unfinishedTaskSubscription.unsubscribe();

    this.unfinishedTaskSubscription = this.taskService.getTaskByStatus(false, this.user.uid).subscribe(
      data => {
        this.unfinishedTasks = data;
      }
    );

    if (this.finishedTaskSubscription)
      this.finishedTaskSubscription.unsubscribe();

    this.finishedTaskSubscription = this.taskService.getTaskByStatus(true, this.user.uid).subscribe(
      data => {
        this.finishedTasks = data;
      }
    );
    */
  }

  getCategories(cat: any) {
    this.categories = cat;
  }

  getSelectedCategory(cat: any) {
    this.selectedCategory = cat;
  }

  //
  // deprecated for bad optimization
  //
  /* deprecated for bad optimization
  getTasksByCategory(cat: any) {
    this.selectedCategory = cat;
    if (cat == null) {
      this.getAllTasks();
    } else {
      if (this.unfinishedTaskSubscription)
        this.unfinishedTaskSubscription.unsubscribe();

      this.unfinishedTaskSubscription = this.taskService.getTaskByCategoryAndStatus(cat, false, this.user.uid).subscribe(
        data => {
          this.unfinishedTasks = data;
        }
      );

      if (this.finishedTaskSubscription)
        this.finishedTaskSubscription.unsubscribe();

      this.finishedTaskSubscription = this.taskService.getTaskByCategoryAndStatus(cat, true, this.user.uid).subscribe(
        data => {
          this.finishedTasks = data;
        }
      );
    }
  }
  */

}
