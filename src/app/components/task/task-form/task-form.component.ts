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
    let data;
    if (this.selectedCategory) {
      data = {
        //taskTitle: this.taskTitle,
        taskDescription: this.taskDescription,
        taskCategory: this.selectedCategory.name,
        catId: this.selectedCategory.id,
        taskDate: new Date(),
        taskModificationDate: new Date(),
        status: this.status,
        uid: this.user.uid
      }
      this.categoryService.updateTaskCount(this.selectedCategory.id, true);
      this.categoryService.updateUnfinishedCount(this.selectedCategory.id, true);
    } else {
      data = {
        //taskTitle: this.taskTitle,
        taskDescription: this.taskDescription,
        taskCategory: null,
        catId: null,
        taskDate: new Date(),
        taskModificationDate: new Date(),
        status: this.status,
        uid: this.user.uid
      }
    }

    //console.log(data);
    //this.taskTitle = null;
    this.taskDescription = null;
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
      }
    );
  }

  addCategory() {
    const data = {
      name: this.category,
      taskCount: 0,
      uid: this.user.uid
    }
    this.categoryService.addTaskCategory(data).then(
      docRef => {
        const ref = {
          name: data.name,
          taskCount: 0,
          uid: this.user.uid,
          id: docRef.id
        }
        this.setCategory(ref);
      }
    );
    this.category = null;
  }

  deleteCategory(category: any) {
    this.selectedCategory = null;
    this.categoryService.deleteTaskCategory(category);
  }

}
