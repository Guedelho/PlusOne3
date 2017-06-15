import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import {
 GoogleMaps,
 GoogleMap,
 CameraPosition,
 LatLng,
 GoogleMapsEvent
} from '@ionic-native/google-maps';

import { SearchEventPage } from '../search-event/search-event';
/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  element: HTMLElement;
  map: GoogleMap;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public googleMaps: GoogleMaps
  ) {
    this.platform.ready().then(() =>{
      this.loadMap();
    })
  }

  loadMap() {
    this.element = document.getElementById('map');
    let mapOptions = {
      backgroundColor: 'white',
      controls: {
        compass: false,
        myLocationButton: true,
        indoorPicker: false,
        zoom: false
      }
    };
    this.map = this.googleMaps.create(this.element, mapOptions);

    this.getMyLocation().then((data) => {
      console.log('center changed :: ', data);
    });
  }

  getMyLocation(){
    return this.map.getMyLocation({enableHighAccuracy: true}).then((data) => {
      let myLocation: LatLng = data.latLng;
      let position: CameraPosition = {
        target: myLocation,
        zoom: 16
      }
      this.map.moveCamera(position);
      return myLocation;
    });
  }

  test(){
    alert(1);
  }

  search(){
    this.navCtrl.push(SearchEventPage);
  }
}
