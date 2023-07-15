import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-task-list-unfinished',
  templateUrl: './task-list-unfinished.component.html',
  styleUrls: ['./task-list-unfinished.component.scss']
})
export class TaskListUnfinishedComponent {

  user: any;

  tasks: any = [];

  constructor(
    private taskService: TaskService,
    private authService: AuthService
    ) {
  }

  ngOnInit() {
    this.isLogged();
    this.getUser();
    this.getTaskByStatusFalse();
  }

  isLogged() {
    return this.authService.isLogged();
  }

  getUser() {
    if(this.isLogged()) {
      this.user = this.authService.getUser();
    }
  }

  updateTask(data: any) {
    //console.log(data);
    this.taskService.updateTask(data, !data.status);
  }

  deleteTask(task: any) {
    this.taskService.deleteTask(task)
  }

  getTaskByStatusFalse() {
    return this.taskService.getTaskByStatus(false, this.user.uid).subscribe(
      data => {
        this.tasks = data;
      }
    );
  }

  ngOnDestroy() {
    this.getTaskByStatusFalse().unsubscribe();
  }

}
