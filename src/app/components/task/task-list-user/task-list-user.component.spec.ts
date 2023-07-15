import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListUserComponent } from './task-list-user.component';

describe('TaskListUserComponent', () => {
  let component: TaskListUserComponent;
  let fixture: ComponentFixture<TaskListUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskListUserComponent]
    });
    fixture = TestBed.createComponent(TaskListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
