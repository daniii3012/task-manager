import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.scss']
})
export class TaskManagerComponent {

  user: any;

  allTaskButton: boolean = false;
  unfinishedTaskButton: boolean = false;
  finishedTaskButton: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
    ) {
  }

  ngOnInit() {
    if(this.router.url.split('/').pop() == "all") {
      this.allTaskButton = true;
      this.unfinishedTaskButton = false;
      this.finishedTaskButton = false;
    } else if(this.router.url.split('/').pop() == "unfinished") {
      this.allTaskButton = false;
      this.unfinishedTaskButton = true;
      this.finishedTaskButton = false;
    } else {
      this.allTaskButton = false;
      this.unfinishedTaskButton = false;
      this.finishedTaskButton = true;
    }
    this.isLogged();
    this.getUser();
  }

  isLogged() {
    return this.authService.isLogged();
  }

  getUser() {
    if(this.isLogged()) {
      this.user = this.authService.getUser();
    }
  }

}
