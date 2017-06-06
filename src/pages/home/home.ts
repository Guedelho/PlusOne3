import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController} from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

import { SearchEventPage } from '../search-event/search-event';
/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var google; 

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  myMarker: any;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    private geolocation: Geolocation
  ) {

  }

  ionViewDidLoad(){
    this.loadMap();
  }
 
  loadMap(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.map = new google.maps.Map(this.mapElement.nativeElement, {
        center: new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude),
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });

      this.myMarker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: this.map.getCenter()
      });  
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  getMyLocation(){
    this.geolocation.getCurrentPosition().then((resp) => {
      this.map.setCenter(new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude)); 
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  test(){
    alert(1);
  }

  search(){
    let profileModal = this.modalCtrl.create(SearchEventPage);
    profileModal.present();
  }
}
