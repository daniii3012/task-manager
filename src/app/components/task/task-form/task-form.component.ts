import { Component, Input } from '@angular/core';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {

  @Input() user: any;

  taskTitle: any;
  taskDescription: any;
  status: boolean = false;

  constructor(
    private taskService: TaskService
  ) {    
  }

  addTask() {
    let data;
    if(this.taskTitle){
      data = {
        taskTitle: this.taskTitle,
        taskDescription: this.taskDescription,
        taskDate: new Date(),
        taskModificationDate: new Date(),
        status: this.status,
        uid: this.user.uid
      }
    } else {
      data = {
        taskDescription: this.taskDescription,
        taskDate: new Date(),
        taskModificationDate: new Date(),
        status: this.status,
        uid: this.user.uid
      }
    }
    
    //console.log(data);
    this.taskTitle = null;
    this.taskDescription = null;  
    this.taskService.addTask(data);
  }

}
