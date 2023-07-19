import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryService } from 'src/app/services/task/category/category.service';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-task-category-selection',
  templateUrl: './task-category-selection.component.html',
  styleUrls: ['./task-category-selection.component.scss']
})
export class TaskCategorySelectionComponent {

  @Input() user: any;
  @Output() categories = new EventEmitter;
  @Output() selectedCategory = new EventEmitter;

  _categories: any;

  _selectedCategory: any;

  unfinishedTaskCount: any;

  constructor(
    private catService: CategoryService
  ) {

  }

  ngOnInit() {
    this.getSelectedCategory(null);
  }

  getSelectedCategory(cat: any) {
    //console.log(cat);

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

    this.scrollToTop();

    this.selectedCategory.emit(cat)
  }

  getCategories(cat: any) {
    this._categories = cat;
    this.categories.emit(cat);
  }

  addCategory(cat: any) {
    const data = {
      name: cat,
      taskCount: 0,
      taskUnfinishedCount: 0,
      uid: this.user.uid
    }
    this.catService.addTaskCategory(data);
    //this.category = null;
  }

  deleteCategory(category: any) {
    this.getSelectedCategory(null);
    this.catService.deleteTaskCategory(category);
  }

  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
