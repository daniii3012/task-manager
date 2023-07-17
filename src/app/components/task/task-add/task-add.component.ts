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

  _selectedCategory: any;
  isShowMore: any;

  constructor(
    private taskService: TaskService,
    private catService: CategoryService
  ){
  }

  ngOnInit() {
    //console.log(this.selectedCategory);
    this.isShowMore = false;
  }

  addTask() {
    if(this.taskTitle) {
      let data;
      if (this.selectedCategory) {
        data = {
          taskTitle: this.taskTitle,
          taskDescription: null,
          taskCategory: this.selectedCategory.name,
          catId: this.selectedCategory.id,
          taskDate: new Date(),
          taskModificationDate: new Date(),
          taskDueDate: null,
          status: false,
          uid: this.user.uid
        }
        this.catService.updateTaskCount(this.selectedCategory.id, true);
        this.catService.updateUnfinishedCount(this.selectedCategory.id, true);
      } else {
        data = {
          taskTitle: this.taskTitle,
          taskDescription: null,
          taskCategory: null,
          catId: null,
          taskDate: new Date(),
          taskModificationDate: new Date(),
          taskDueDate: null,
          status: false,
          uid: this.user.uid
        }
      }
      this.isShowMore = false;
      this.taskTitle = null;
      this.taskService.addTask(data);
    }
  }

  getPlaceholder() {
    if (this.selectedCategory) {
      return "Add new task in ".concat(this.selectedCategory.name);
    } else {
      return "Select a list";
    } 
  }

  show() {
    this.isShowMore = true;
  }

  hide() {
    this.isShowMore = false;
  }

  getSelectedCategory(cat: any) {
    if (cat) {
      this.catService.getCategoryById(cat.id).then(
        ref => {
          this._selectedCategory = ref.data();
          this._selectedCategory.id = ref.id;
        }
      );  
    } else {
      this._selectedCategory = cat;
    }
  }

  addCategory(cat: any) {
    const data = {
      name: cat,
      taskCount: 0,
      taskUnfinishedCount: 0,
      uid: this.user.uid
    }
    this.catService.addTaskCategory(data);
  }

}
