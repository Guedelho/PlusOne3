import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { LatLng } from '@ionic-native/google-maps';
import { FirebaseListObservable } from "angularfire2/database";

/**
 * Generated class for the CreateEventPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-create-event',
  templateUrl: 'create-event.html',
})
export class CreateEventPage {

  event = {
    name: '',
    description: '',
    epoch: '',
    latlng: '',
    address: ''
  };
  events: FirebaseListObservable<any[]>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
  ) {
    this.event.latlng = this.navParams.get('target');
    this.events = this.navParams.get('events');
  }

  getImage(){
    console.log('teste');
  }

  createEvent(){
    this.events.push(this.event);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateEventPage');
  }

}
