import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-task-item-info-modal',
  templateUrl: './task-item-info-modal.component.html',
  styleUrls: ['./task-item-info-modal.component.scss']
})
export class TaskItemInfoModalComponent {

  @Input() task: any;

}
