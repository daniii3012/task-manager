import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-task-list-user',
  templateUrl: './task-list-user.component.html',
  styleUrls: ['./task-list-user.component.scss']
})
export class TaskListUserComponent {

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
    this.getAllTask();
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

  getAllTask() {
    return this.taskService.getTaskByUser(this.user.uid).subscribe(
      data => {
        this.tasks = data;
      }
    );
  }

  ngOnDestroy() {
    this.getAllTask().unsubscribe();
    
  }

}
