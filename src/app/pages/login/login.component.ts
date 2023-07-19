import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  
  constructor(private authService: AuthService) {
    this.isLogged();
    this.getUser();
  }

  isLogged() {
    return this.authService.isLogged();
  }

  getUser() {
    if(this.isLogged()) {
      return this.authService.getUser();
    }
  }

  login() {
    this.authService.googleSignIn();
  }

  logout() {
    this.authService.signOutApp();
  }

}
