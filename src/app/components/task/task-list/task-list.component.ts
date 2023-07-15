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

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
    //this.getAllTask();
    this.getTaskByStatusFalse();
  }

  changeList(e: any) {
    //console.log(e.target.value);
    if(e.target.value == "all") {
      this.getAllTask();
    } else if(e.target.value == "unfinished") {
      this.getTaskByStatusFalse();
    } else if(e.target.value == "finished") {
      this.getTaskByStatusTrue();
    }
  }

  updateTask(data: any) {
    //console.log(data.status);
    this.taskService.updateTask(data, !data.status);
  }

  deleteTask(task: any) {
    this.taskService.deleteTask(task);
  }

  getAllTask() {
    if (this.taskSubscription)
      this.taskSubscription.unsubscribe();

    this.taskSubscription = this.taskService.getTaskByUser(this.user.uid).subscribe(
      data => {
        this.tasks = data;
      }
    );
  }

  getTaskByStatusFalse() {
    if (this.taskSubscription)
      this.taskSubscription.unsubscribe();

    this.taskSubscription = this.taskService.getTaskByStatus(false, this.user.uid).subscribe(
      data => {
        this.tasks = data;
      }
    );
  }

  getTaskByStatusTrue() {
    if (this.taskSubscription)
      this.taskSubscription.unsubscribe();

    this.taskSubscription = this.taskService.getTaskByStatus(true, this.user.uid).subscribe(
      data => {
        this.tasks = data;
      }
    );
  }

}
