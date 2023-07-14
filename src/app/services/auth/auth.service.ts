import { Injectable } from '@angular/core';
import { Auth, User, getRedirectResult, signInWithRedirect, user } from '@angular/fire/auth';
import { GoogleAuthProvider, signInWithPopup, signOut } from '@firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User | undefined;
  private expirationTime: Date | undefined;

  constructor(private auth: Auth) {
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
    
    signInWithPopup(this.auth, new GoogleAuthProvider()).then(
      res => {
        //console.log('Successfully logged', res);
      }
    ).catch(err => console.error(err));
    
  }

  signOutApp() {
    signOut(this.auth).then(
      () => {
        //
      }
    ).catch(err => console.error(err));
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || '');
  }

  isLogged() {
    if (JSON.parse(localStorage.getItem('user') || '')) {
      let expirationDate = new Date(JSON.parse(localStorage.getItem('user') || '').stsTokenManager.expirationTime);
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
