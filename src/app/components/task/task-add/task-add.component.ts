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
  taskDescription: any = null;
  taskDate: any;
  taskTime: any;

  taskDueDate: any;
  currentDate: any;

  _selectedCategory: any;
  isShowMore: any;

  constructor(
    private taskService: TaskService,
    private catService: CategoryService
  ) {
  }

  ngOnInit() {
    //console.log(this.selectedCategory);
    this.isShowMore = false;
    this.getCurrentDate();
  }

  addTask() {
    if (this.taskTitle) {

      if (this.taskDate && !this.taskTime) {
        const [year, month, day] = this.taskDate.split('-');
        this.taskDueDate = new Date(new Date(+year, month - 1, day));
      } else if (this.taskDate && this.taskTime) {
        const [year, month, day] = this.taskDate.split('-');
        const [hour, minute] = this.taskTime.split(':');
        this.taskDueDate = new Date(new Date(+year, month - 1, day).setHours(hour, minute, 0));
      } else {
        this.taskDueDate = null;
      }

      let data;
      data = {
        taskTitle: this.taskTitle,
        taskDescription: this.taskDescription,
        taskCategory: this.selectedCategory.name,
        catId: this.selectedCategory.id,
        taskDate: new Date(),
        taskModificationDate: new Date(),
        taskDueDate: this.taskDueDate,
        status: false,
        uid: this.user.uid
      }

      this.catService.updateTaskCount(this.selectedCategory.id, true);
      this.catService.updateUnfinishedCount(this.selectedCategory.id, true);

      this.taskTitle = null;
      this.taskDescription = null;
      this.taskDate = null;
      this.taskTime = null;
      this.taskService.addTask(data);

      this.hide();
    }
  }

  getPlaceholder() {
    if (this.selectedCategory) {
      return "Nueva tarea en ".concat(this.selectedCategory.name);
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

  getCurrentDate() {
    const date = new Date();
    //this.currentDate = [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('/');
    this.currentDate = date;
  }

  autoSizeTextareaDescription() {
    const doc = document.getElementById('taskDescription')!;

    doc.style.height = "0px";
    doc.style.height = (doc.scrollHeight + 25) + "px";
  }

}
