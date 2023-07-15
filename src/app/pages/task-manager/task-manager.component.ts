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

  constructor(
    private authService: AuthService,
    private router: Router
    ) {
  }

  ngOnInit() {
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
