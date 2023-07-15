import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListFinishedComponent } from './task-list-finished.component';

describe('TaskListFinishedComponent', () => {
  let component: TaskListFinishedComponent;
  let fixture: ComponentFixture<TaskListFinishedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskListFinishedComponent]
    });
    fixture = TestBed.createComponent(TaskListFinishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
