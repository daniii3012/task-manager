import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task-category-list',
  templateUrl: './task-category-list.component.html',
  styleUrls: ['./task-category-list.component.scss']
})
export class TaskCategoryListComponent {

  @Input() unfinishedTasks: any;
  @Input() finishedTasks: any;
  @Input() selectedCategory: any;

  arrowDirection: boolean = false;

  ngOnInit() {
  }

  changeArrow(e: any) {
    this.arrowDirection = e.target.attributes['aria-expanded']?.value == 'true';
  }

}
