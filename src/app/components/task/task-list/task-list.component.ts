import { Component, Input } from '@angular/core';
import { CategoryService } from 'src/app/services/task/category/category.service';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {

  @Input() user: any;

  tasks: any = [];
  taskSubscription: any;
  selectedSort: any;

  selectedCategory: any = null;
  categories: any = [];
  categorySubscription: any;

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService
  ) {
  }

  ngOnInit() {
    //this.getAllTask();
    this.getTaskByStatusFalse();
    this.getCategories();
  }

  changeList(e: any) {
    //console.log(e.target.value);
    this.selectedSort = e.target.value;
    this.selectedCategory = null;
    if (e.target.value == "all") {
      this.getAllTask();
    } else if (e.target.value == "unfinished") {
      this.getTaskByStatusFalse();
    } else if (e.target.value == "finished") {
      this.getTaskByStatusTrue();
    }
  }

  updateTask(data: any) {
    //console.log(data.status);
    this.taskService.updateTask(data, !data.status);
  }

  deleteTask(task: any) {
    this.taskService.deleteTask(task);
  }

  getAllTask() {
    if (this.taskSubscription)
      this.taskSubscription.unsubscribe();

    this.taskSubscription = this.taskService.getTaskByUser(this.user.uid).subscribe(
      data => {
        this.tasks = data;
      }
    );
  }

  getTaskByStatusFalse() {
    if (this.taskSubscription)
      this.taskSubscription.unsubscribe();

    this.taskSubscription = this.taskService.getTaskByStatus(false, this.user.uid).subscribe(
      data => {
        this.tasks = data;
      }
    );
  }

  getTaskByStatusTrue() {
    if (this.taskSubscription)
      this.taskSubscription.unsubscribe();

    this.taskSubscription = this.taskService.getTaskByStatus(true, this.user.uid).subscribe(
      data => {
        this.tasks = data;
      }
    );
  }

  getTaskByCategory() {
    if (this.taskSubscription)
      this.taskSubscription.unsubscribe();

    this.taskSubscription = this.taskService.getTaskByCategory(this.selectedCategory, this.user.uid).subscribe(
      data => {
        this.tasks = data;
      }
    )
  }

  getCategories() {
    if (this.categorySubscription)
      this.categorySubscription.unsubscribe();

    this.categorySubscription = this.categoryService.getCategoriesByUser(this.user.uid).subscribe(
      data => {
        this.categories = data;
      }
    );
  }

  setCategory(category: any) {
    console.log(category);
    this.selectedCategory = category;
    if (this.selectedCategory == null) {
      console.log(this.selectedCategory, this.selectedSort);
      //this.changeList(this.selectedSort);
    } else if (this.selectedSort == "all") {
      this.getTaskByCategory();
    } else if (this.selectedSort == "unfinished") {
      //this.getTaskByStatusFalse();
    } else if (this.selectedSort == "finished") {
      //this.getTaskByStatusTrue();
    }
  }

}
