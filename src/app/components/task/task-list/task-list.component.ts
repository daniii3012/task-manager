import { Component, Input } from '@angular/core';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent {

  @Input() user: any;

  tasks: any = [];
  taskSubscription: any;

  allTaskButton: boolean = true;
  unfinishedTaskButton: boolean = true;
  finishedTaskButton: boolean = true;

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
    console.log('init: ');
    this.getAllTask();
  }

  updateTask(data: any) {
    //console.log(data);
    this.taskService.updateTask(data, !data.status);
  }

  deleteTask(task: any) {
    this.taskService.deleteTask(task)
  }

  getAllTask() {
    if (this.taskSubscription)
      this.taskSubscription.unsubscribe();

    this.allTaskButton = true;
    this.unfinishedTaskButton = false;
    this.finishedTaskButton = false;

    this.taskSubscription = this.taskService.getTaskByUser(this.user.uid).subscribe(
      data => {
        this.tasks = data;
      }
    );
  }

  getTaskByStatusFalse() {
    if (this.taskSubscription)
      this.taskSubscription.unsubscribe();

    this.allTaskButton = false;
    this.unfinishedTaskButton = true;
    this.finishedTaskButton = false;

    this.taskSubscription = this.taskService.getTaskByStatus(false, this.user.uid).subscribe(
      data => {
        this.tasks = data;
      }
    );
  }

  getTaskByStatusTrue() {
    if (this.taskSubscription)
      this.taskSubscription.unsubscribe();

    this.allTaskButton = false;
    this.unfinishedTaskButton = false;
    this.finishedTaskButton = true;

    this.taskSubscription = this.taskService.getTaskByStatus(true, this.user.uid).subscribe(
      data => {
        this.tasks = data;
      }
    );
  }

}
