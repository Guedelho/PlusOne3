import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/firebase/auth';
import { FirebaseError } from 'firebase/app';

import { HomePage } from '../home/home';
import { ForgetPasswordPage } from '../forget-password/forget-password';

import { AlertUtil } from '../../util/alert-util';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email: string;
  password: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _auth: AuthProvider,
    public alert: AlertUtil
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    this._auth.signInWithEmailAndPassword(this.email, this.password)
      .then((user) => {
        if(user){
          this.navCtrl.setRoot(HomePage);
        }
      })
      .catch((error: FirebaseError) => {
        this.alert.showAlertWithMessage(error.code);
    });
  }

  forgetPassword() {
    this.navCtrl.push(ForgetPasswordPage);
  }
}
