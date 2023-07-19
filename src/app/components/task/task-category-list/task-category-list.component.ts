import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-task-category-list',
  templateUrl: './task-category-list.component.html',
  styleUrls: ['./task-category-list.component.scss']
})
export class TaskCategoryListComponent {

  @Input() tasks: any;
  //@Input() unfinishedTasks: any;
  //@Input() finishedTasks: any;
  @Input() selectedCategory: any;
  @Input() categories: any;

  arrowDirection: boolean = false;

  ngOnInit() {
  }

  changeArrow(e: any) {
    this.arrowDirection = e.target.attributes['aria-expanded'].value == 'true';
  }

}
