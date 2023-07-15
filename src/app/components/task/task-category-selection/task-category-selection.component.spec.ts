import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCategorySelectionComponent } from './task-category-selection.component';

describe('TaskCategorySelectionComponent', () => {
  let component: TaskCategorySelectionComponent;
  let fixture: ComponentFixture<TaskCategorySelectionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskCategorySelectionComponent]
    });
    fixture = TestBed.createComponent(TaskCategorySelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
