import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

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

  logout() {
    this.authService.signOutApp();
  }

}
