import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskItemUpdateModalComponent } from './task-item-update-modal.component';

describe('TaskItemUpdateModalComponent', () => {
  let component: TaskItemUpdateModalComponent;
  let fixture: ComponentFixture<TaskItemUpdateModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskItemUpdateModalComponent]
    });
    fixture = TestBed.createComponent(TaskItemUpdateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
