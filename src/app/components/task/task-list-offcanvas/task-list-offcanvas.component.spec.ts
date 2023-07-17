import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskListOffcanvasComponent } from './task-list-offcanvas.component';

describe('TaskListOffcanvasComponent', () => {
  let component: TaskListOffcanvasComponent;
  let fixture: ComponentFixture<TaskListOffcanvasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskListOffcanvasComponent]
    });
    fixture = TestBed.createComponent(TaskListOffcanvasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
