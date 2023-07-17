import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CategoryService } from 'src/app/services/task/category/category.service';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-task-list-offcanvas',
  templateUrl: './task-list-offcanvas.component.html',
  styleUrls: ['./task-list-offcanvas.component.scss']
})
export class TaskListOffcanvasComponent {

  @Input() user: any;
  @Input() _selectedCategory: any;
  @Output() _addCategory = new EventEmitter;
  @Output() _getSelectedCategory = new EventEmitter;

  category: any;

  categories: any = [];
  categorySubscription: any;

  allUnfinishedTask: any;

  constructor(
    private authService: AuthService,
    private taskService: TaskService,
    private catService: CategoryService
  ) {

  }

  ngOnInit() {
    this.getCategoryList();
  }

  getCategoryList() {
    if (this.categorySubscription)
      this.categorySubscription.unsubscribe();

    this.categorySubscription = this.catService.getCategoriesByUser(this.user.uid).subscribe(
      data => {
        this.categories = data;
        this.getAllUnfinishedTaskCount();
      }
    );
  }

  addCategory(cat: any) {
    this._addCategory.emit(cat);
    this.category = null;
  }

  getSelectedCategory(cat: any) {
    this._getSelectedCategory.emit(cat);
  }

  getAllUnfinishedTaskCount() {
    this.taskService.getAllUnfinishedTasksCount().then(
      data => {
        this.allUnfinishedTask = data.data().count;
      }
    );
  }

  logout() {
    this.authService.signOutApp();
  }

}
