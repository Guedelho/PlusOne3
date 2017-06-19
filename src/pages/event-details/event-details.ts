import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AuthProvider } from './../../providers/firebase/auth';
import { DatabaseProvider } from './../../providers/firebase/database';

import { AlertUtil } from '../../util/alert-util';

import { FirebaseListObservable } from "angularfire2/database";

/**
 * Generated class for the EventDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-event-details',
  templateUrl: 'event-details.html',
})
export class EventDetailsPage {

  event: any;
  owner: boolean;
  events: FirebaseListObservable<any[]>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private _afAuth: AuthProvider,
    private _afDb: DatabaseProvider,
    public alert: AlertUtil
  ) {
  }

  ionViewDidLoad() {
    this.event = this.navParams.get('event');
    this.owner = this.event.owner === this._afAuth.userId;
  }

  delete(){
    if(this.owner){
      let alert = this.alert.showAlertWithObject({
        title: "Deseja excluir o evento?",
        buttons: [{
          text: "Sim",
          handler: () => {
            this.events = this._afDb.getEvents();
            this.events.remove(this.event.$key);
            alert.dismiss().then(() => {
              this.navCtrl.popToRoot();
            });
            return false;         
          }
        },
        {
          text: "Não",
          handler: () => {
            alert.dismiss().then(() => {
              this.navCtrl.popToRoot();
            });
            return false;
          }
        }]
      });
    }
  }
}
