import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryService } from 'src/app/services/task/category/category.service';

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

  constructor(
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

}
