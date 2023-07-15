import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-task-list-finished',
  templateUrl: './task-list-finished.component.html',
  styleUrls: ['./task-list-finished.component.scss']
})
export class TaskListFinishedComponent {

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
    this.getTaskByStatusTrue();
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

  getTaskByStatusTrue() {
    return this.taskService.getTaskByStatus(true, this.user.uid).subscribe(
      data => {
        this.tasks = data;
      }
    );
  }

  ngOnDestroy() {
    this.getTaskByStatusTrue().unsubscribe();
  }

}
