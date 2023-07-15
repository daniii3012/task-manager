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
  }

  ngOnInit() {
    this.getCategories();
  }

  addTask() {
    const data = {
      //taskTitle: this.taskTitle,
      taskDescription: this.taskDescription,
      taskCategory: this.selectedCategory.name,
      catId: this.selectedCategory.id,
      taskDate: new Date(),
      taskModificationDate: new Date(),
      status: this.status,
      uid: this.user.uid
    }

    //console.log(data);
    //this.taskTitle = null;
    this.taskDescription = null;
    this.taskService.addTask(data);

    this.categoryService.updateTaskCategory(this.selectedCategory, true);
    this.selectedCategory = null;
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
      }
    );
  }

  addCategory() {
    const data = {
      name: this.category,
      taskCount: 0,
      uid: this.user.uid
    }
    this.selectedCategory = this.category;
    this.category = null;
    this.categoryService.addTaskCategory(data);
  }

  deleteCategory(category: any) {
    this.selectedCategory = null;
    this.categoryService.deleteTaskCategory(category);
  }

}
