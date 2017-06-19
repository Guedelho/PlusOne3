import { AuthProvider } from './../../providers/firebase/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';

import { Camera } from '@ionic-native/camera';
import { FirebaseListObservable } from "angularfire2/database";

import { AlertUtil } from '../../util/alert-util';

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
    latlng: '',
    address: '',
    type: '',
    owner: '',
    imgDataUrl: '',
    date: '',
    time: ''
  }
  events: FirebaseListObservable<any[]>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public camera: Camera,
    public nativeGeocoder: NativeGeocoder,
    public alert: AlertUtil,
    private _afAuth: AuthProvider
  ) {
    this.events = this.navParams.get('events');
    this.event.latlng = this.navParams.get('target').toString();
    this.event.owner = _afAuth.userId;
    this.getAddress();
  }

  getImage(){
    this.camera.getPicture({
      sourceType: 0,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    }).then((imageData) => {
      this.event.imgDataUrl = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      console.log(err);
    });
  }

  getAddress(){
    let arr_latlng = this.event.latlng.split(',');

    this.nativeGeocoder.reverseGeocode(
      Number(arr_latlng[0]), 
      Number(arr_latlng[1])
    ).then((result: NativeGeocoderReverseResult) => {
     this.event.address = result.street + " - " + result.city;
    }, (err) => {
      console.log(err);
    });
  }

  createEvent(){
    for(let x in this.event){
      if(this.event[x].length === 0){
        this.alert.showAlertWithMessage('create-event/error');
        return;
      }
    }
    this.events.push(this.event);
    let alert = this.alert.showAlertWithObject({
      title: 'Evento criado com sucesso!',
      buttons: [{
        text: 'OK',
        handler: () => {
          alert.dismiss().then(() => {
            this.navCtrl.popToRoot();
          });
          return false;
        }
      }]
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateEventPage');
  }

}