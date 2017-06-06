import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AuthProvider {

private authState: Observable<firebase.User>;
  private currentUser: firebase.User;

  constructor(public afAuth: AngularFireAuth) {
    this.authState = afAuth.authState;
    this.authState.subscribe((user: firebase.User) => {
      this.currentUser = user;
    });
  }

  authenticated() {
    return this.currentUser != null;
  }

  get userId() {
    return this.currentUser.uid;
  }

  get userName() {
    return this.currentUser.displayName;
  }

  get userEmail() {
    return this.currentUser.email;
  }

  signInWithEmailAndPassword(email, password){
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signUpWithEmailAndPassword(email, password){
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  updateUserProfile(profile: any){
    return this.currentUser.updateProfile(profile);
  }

  resetPassword(email: string){
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  signOut(): void {
    this.afAuth.auth.signOut();
  }

}
