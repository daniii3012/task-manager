import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  unfinishedTasks: any;
  unfinishedTaskSubscription: any;
  finishedTasks: any;
  finishedTaskSubscription: any;

  selectedCategory: any;
  categories: any = [];
  categorySubscription: any;

  finished: boolean = true;

  constructor(
    private authService: AuthService,
    private taskService: TaskService,
    private categoryService: CategoryService
  ) {
  }

  ngOnInit() {
    this.isLogged();
    this.getUser();
    this.getCategoryList();
  }

  isLogged() {
    return this.authService.isLogged();
  }

  getUser() {
    if (this.isLogged()) {
      this.user = this.authService.getUser();
    }
  }

  getCategoryList() {
    if (this.categorySubscription)
      this.categorySubscription.unsubscribe();

    this.categorySubscription = this.categoryService.getCategoriesByUser(this.user.uid).subscribe(
      data => {
        this.categories = data;
      }
    );
  }

  getAllTasks() {
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
  }

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

}
