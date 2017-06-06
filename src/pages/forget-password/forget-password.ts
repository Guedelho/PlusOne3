import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from '../../providers/firebase/auth';
import { FirebaseError } from 'firebase/app';

import { LoginPage } from '../login/login';

import { AlertUtil } from '../../util/alert-util';
/**
 * Generated class for the ForgetPasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage {

  email: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _auth: AuthProvider,
    public alert: AlertUtil
  ) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPasswordPage');
  }

  resetPassword() {
    this._auth.resetPassword(this.email).then(
      (data: any) => {
        this.alert.showAlertWithMessage('auth/email-resetpassword-sent');
        this.navCtrl.setRoot(LoginPage);
      }
    ).catch((error: FirebaseError) => this.alert.showAlertWithMessage(error.code));
  }
}
