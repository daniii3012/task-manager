import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskItemTemplateComponent } from './task-item-template.component';

describe('TaskItemTemplateComponent', () => {
  let component: TaskItemTemplateComponent;
  let fixture: ComponentFixture<TaskItemTemplateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskItemTemplateComponent]
    });
    fixture = TestBed.createComponent(TaskItemTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
