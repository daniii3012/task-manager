import { Component, Input } from '@angular/core';
import { CategoryService } from 'src/app/services/task/category/category.service';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {

  @Input() user: any;

  //taskTitle: any;
  taskDescription: any;
  taskCategory: any;
  status: boolean = false;

  category: any;
  selectedCategory: any = null;
  categories: any = [];
  categorySubscription: any;

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService
  ) {
    //this.getCategories();
  }

  addTask() {
    const data = {
      //taskTitle: this.taskTitle,
      taskDescription: this.taskDescription,
      taskCategory: this.selectedCategory,
      taskDate: new Date(),
      taskModificationDate: new Date(),
      status: this.status,
      uid: this.user.uid
    }

    //console.log(data);
    //this.taskTitle = null;
    this.taskDescription = null;
    this.selectedCategory = null;
    this.taskService.addTask(data);
  }

  setCategory(category: any) {
    this.selectedCategory = category;
  }

  getCategories() {
    if (this.categorySubscription)
      this.categorySubscription.unsubscribe();

    this.categorySubscription = this.categoryService.getCategoriesByUser(this.user.uid).subscribe(
      data => {
        this.categories = data;
        console.log(this.categories);
      }
    );
  }

  addCategory() {
    const data = {
      name: this.category,
      uid: this.user.uid
    }
    this.selectedCategory = this.category;
    this.category = null;
    this.categoryService.addTaskCategory(data);
  }

  deleteCategory(category: any) {
    this.categoryService.deleteTaskCategory(category);
  }

}
