import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskItemInfoModalComponent } from './task-item-info-modal.component';

describe('TaskItemInfoModalComponent', () => {
  let component: TaskItemInfoModalComponent;
  let fixture: ComponentFixture<TaskItemInfoModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskItemInfoModalComponent]
    });
    fixture = TestBed.createComponent(TaskItemInfoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
