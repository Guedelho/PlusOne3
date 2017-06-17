import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Camera } from '@ionic-native/camera';
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
    epoch: 0,
    latlng: '',
    address: '',
    type: ''
  };
  date: any;
  time: any;
  imgDataUrl: string;
  events: FirebaseListObservable<any[]>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public camera: Camera
  ) {
    this.event.latlng = this.navParams.get('target').toString();
    this.events = this.navParams.get('events');
  }

  getImage(){
    this.camera.getPicture({
      sourceType: 0,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }).then((imageData) => {
      this.imgDataUrl = 'data:image/jpeg;base64,' + imageData;
      console.log(this.imgDataUrl);
    }, (err) => {
      // Handle error
    });
  }

  createEvent(){
    this.event.epoch = new Date(this.date + ' ' + this.time).getTime();
    this.events.push(this.event);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateEventPage');
  }

}
