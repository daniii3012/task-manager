import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryService } from 'src/app/services/task/category/category.service';

@Component({
  selector: 'app-task-category-selection',
  templateUrl: './task-category-selection.component.html',
  styleUrls: ['./task-category-selection.component.scss']
})
export class TaskCategorySelectionComponent {

  @Input() user: any;
  @Input() categories: any;
  @Output() selectedCategory = new EventEmitter;

  category: any;
  _selectedCategory: any;

  constructor(private catService: CategoryService) {

  }

  ngOnInit() {
    this.getSelectedCategory(null);
  }

  getSelectedCategory(cat: any) {
    //console.log(cat);
    this._selectedCategory = cat;
    this.selectedCategory.emit(cat)
  }

  addCategory() {
    const data = {
      name: this.category,
      taskCount: 0,
      taskUnfinishedCount: 0,
      uid: this.user.uid
    }
    this.catService.addTaskCategory(data);
    this.category = null;
  }

  deleteCategory(category: any) {
    this.getSelectedCategory(null);
    this.catService.deleteTaskCategory(category);
  }

}
