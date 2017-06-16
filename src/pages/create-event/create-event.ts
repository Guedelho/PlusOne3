import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { LatLng } from '@ionic-native/google-maps';

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

  target: LatLng;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
    this.target = this.navParams.get('target');
    console.log(this.target.lat);
    console.log(this.target.lng);
  }

  getImage(){
    console.log('teste');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateEventPage');
  }

}
