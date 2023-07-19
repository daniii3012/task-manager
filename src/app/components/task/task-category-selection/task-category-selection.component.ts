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
  //@Input() categories: any;
  @Output() selectedCategory = new EventEmitter;

  _categories: any;
  categorySubscription: any;

  //category: any;
  _selectedCategory: any;

  unfinishedTaskCount: any;

  constructor(
    //private taskService: TaskService,
    private catService: CategoryService
  ) {

  }

  ngOnInit() {
    //this.getCategoryList();
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
      //this.getUnfinishedTaskCount(cat.id);
    } else {
      this._selectedCategory = cat;
      //this.getUnfinishedTaskCount(null);
    }
    //this._selectedCategory = local;

    this.scrollToTop();

    this.selectedCategory.emit(cat)
  }

  getCategories(cat: any) {
    this._categories = cat;
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
  /*
  getUnfinishedTaskCount(selectedCategory: any) {
    //console.log(selectedCategory);
    
    if(selectedCategory) {
      this.taskService.getUnfinishedTaskByCategoryCount(selectedCategory).then(
        data => {
          this.unfinishedTaskCount = data.data().count;
        }
      );
    } else {
      this.taskService.getAllUnfinishedTasksCount().then(
        data => {
          this.unfinishedTaskCount = data.data().count;
        }
      );
    }
  }
  */

  scrollToTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
}
