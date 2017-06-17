import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Camera } from '@ionic-native/camera';
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
  imgDataUrl: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public camera: Camera
  ) {
    this.target = this.navParams.get('target');
  }

  getImage(){
    this.camera.getPicture({
      sourceType: 0,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }).then((imageData) => {
      this.imgDataUrl = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  createEvent(){
    console.log('criado');
    this.navCtrl.popToRoot();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateEventPage');
  }

}
