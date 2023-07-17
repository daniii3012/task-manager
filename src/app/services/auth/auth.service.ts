import { Injectable, inject } from '@angular/core';
import { Auth, User, getRedirectResult, signInWithRedirect, user } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { GoogleAuthProvider, signInWithPopup, signOut } from '@firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: any;

  constructor(
    private auth: Auth,
    private router: Router
    ) {
    user(this.auth).subscribe(
      data => {
        if (data) {
          //console.log(data);
          this.user = data;
          localStorage.setItem('user', JSON.stringify(this.user));
        } else {
          //console.log("No hay usuario");
          localStorage.setItem('user', 'null');
        }

      }
    )
  }

  googleSignIn() {
    /*
    signInWithRedirect(this.auth, new GoogleAuthProvider);
    getRedirectResult(this.auth).then(
      res => {
        console.log('Successfully logged', res);
      }
    ).catch(err => console.error(err));
    */
    
    signInWithPopup(this.auth, new GoogleAuthProvider().setCustomParameters({
      prompt: 'select_account'
    })).then(
      res => {
        //console.log('Successfully logged', res);
        localStorage.setItem('user', JSON.stringify(res.user));
        this.signInRedirect();
      }
    ).catch(err => console.error(err));

  }

  signOutApp() {
    signOut(this.auth).then(
      () => {
        localStorage.setItem('user', 'null');
        this.signOutRedirect();
      }
    ).catch(err => console.error(err));
  }

  signInRedirect() {
    this.router.navigate(['/home']);
  }

  signOutRedirect() {
    this.router.navigate(['/login']);
  }

  getUser() {
    return (JSON.parse(localStorage.getItem('user') as string));
  }

  isLogged() {
    if (this.getUser()) {
      let expirationDate = new Date(this.getUser().stsTokenManager.expirationTime);
      let currentDate = new Date();
      //console.log(expirationDate, currentDate);
      if (currentDate < expirationDate) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

}
