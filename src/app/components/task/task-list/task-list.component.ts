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

  allTaskButton: boolean = false;
  finishedTaskButton: boolean = true;
  unfinishedTaskButton: boolean = true;

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
    console.log('init: ');
    //this.getAllTask();
  }

  addTask() {
    // To-do
  }

  updateTask(data: any) {
    //console.log(data);
    console.log("update task function");
    this.taskService.updateTask(data, !data.status);
  }

  deleteTask(task: any) {
    this.taskService.deleteTask(task)
  }

  getAllTask() {
    this.allTaskButton = true;
    this.finishedTaskButton = false;
    this.unfinishedTaskButton = false;
    console.log('entra en la funcion Todas las tareas');
    return this.taskService.getTaskByUser(this.user.uid).subscribe(
      data => {
        console.log('todas las tareas: ');
        this.tasks = data;
      }
    );
  }

  getTaskByStatusTrue() {
    this.allTaskButton = false;
    this.finishedTaskButton = true;
    this.unfinishedTaskButton = false;
    console.log('entra en la funcion Tareas ordenadas por: ', true);
    return this.taskService.getTaskByStatus(true, this.user.uid).subscribe(
      data => {
        console.log('Tareas ordenadas por: ', true);
        this.tasks = data;
      }
    );
  }

  getTaskByStatusFalse() {
    this.allTaskButton = false;
    this.finishedTaskButton = false;
    this.unfinishedTaskButton = true;
    console.log('entra en la funcion Tareas ordenadas por: ', false);
    return this.taskService.getTaskByStatus(false, this.user.uid).subscribe(
      data => {
        console.log('Tareas ordenadas por: ', false);
        this.tasks = data;
      }
    );
  }

}
