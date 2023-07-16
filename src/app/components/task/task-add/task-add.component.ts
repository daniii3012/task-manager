import { Component, Input } from '@angular/core';
import { CategoryService } from 'src/app/services/task/category/category.service';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.scss']
})
export class TaskAddComponent {

  @Input() user: any;
  @Input() selectedCategory: any;

  taskTitle: any;

  constructor(
    private taskService: TaskService,
    private categoryService: CategoryService
  ){
  }

  ngOnInit() {
    //console.log(this.selectedCategory);
  }

  addTask() {
    let data;
    if (this.selectedCategory) {
      data = {
        taskTitle: this.taskTitle,
        //taskDescription: this.taskDescription,
        taskCategory: this.selectedCategory.name,
        catId: this.selectedCategory.id,
        taskDate: new Date(),
        taskModificationDate: new Date(),
        status: false,
        uid: this.user.uid
      }
      this.categoryService.updateTaskCount(this.selectedCategory.id, true);
      this.categoryService.updateUnfinishedCount(this.selectedCategory.id, true);
    } else {
      data = {
        taskTitle: this.taskTitle,
        //taskDescription: this.taskDescription,
        taskCategory: null,
        catId: null,
        taskDate: new Date(),
        taskModificationDate: new Date(),
        status: false,
        uid: this.user.uid
      }
    }
    
    this.taskTitle = null;
    this.taskService.addTask(data);
  }

}
