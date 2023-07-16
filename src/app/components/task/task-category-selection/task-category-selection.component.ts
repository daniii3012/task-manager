import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CategoryService } from 'src/app/services/task/category/category.service';

@Component({
  selector: 'app-task-category-selection',
  templateUrl: './task-category-selection.component.html',
  styleUrls: ['./task-category-selection.component.scss']
})
export class TaskCategorySelectionComponent {

  @Input() user: any;
  //@Input() categories: any;
  @Output() selectedCategory = new EventEmitter;


  categories: any = [];
  categorySubscription: any;

  category: any;
  _selectedCategory: any;

  constructor(
    private catService: CategoryService
  ) {

  }

  ngOnInit() {
    this.getCategoryList();
    this.getSelectedCategory(null);
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

  getSelectedCategory(cat: any) {
    //console.log(cat);
    if (cat) {
      this.catService.getCategoryById(cat.id).then(
        ref => {
          const data = {
            id: ref.id,
            name: ref.get('name'),
            taskCount: ref.get('taskCount'),
            taskUnfinishedCount: ref.get('taskUnfinishedCount'),
            uid: ref.get('uid')
          };
          this._selectedCategory = data;
        }
      );      
    } else {
      this._selectedCategory = null;
    }
    //this._selectedCategory = cat;
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
