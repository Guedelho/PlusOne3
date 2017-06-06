import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/firebase/auth';
import { FirebaseError } from 'firebase/app';

import { HomePage } from '../home/home';

import { AlertUtil } from '../../util/alert-util';
/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  name: String;
  email: String;
  password: String;
  passwordConfirm: String;


  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _auth: AuthProvider,
    public alert: AlertUtil
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup() {
    if(!(this.password == this.passwordConfirm)){
      this.alert.showAlertWithMessage('auth/password-doesnt-match')
      this.passwordConfirm = '';
    } else {
      this._auth.signUpWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          if(user){
            this._auth.updateUserProfile({
              displayName: this.name,
              photoURL: ''
            }).then(
              () => {},
              (error: FirebaseError) => this.alert.showAlertWithMessage(error.code)
            );
            this.navCtrl.setRoot(HomePage);
          }
        })
        .catch((error: FirebaseError) => {
          this.alert.showAlertWithMessage(error.code)
        });
    }
  }
}
