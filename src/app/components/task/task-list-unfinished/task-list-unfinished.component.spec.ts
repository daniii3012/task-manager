import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListUnfinishedComponent } from './task-list-unfinished.component';

describe('TaskListUnfinishedComponent', () => {
  let component: TaskListUnfinishedComponent;
  let fixture: ComponentFixture<TaskListUnfinishedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskListUnfinishedComponent]
    });
    fixture = TestBed.createComponent(TaskListUnfinishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
