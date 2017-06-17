import { DatabaseProvider } from './../../providers/firebase/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import { GoogleMaps, GoogleMap, GoogleMapsEvent } from '@ionic-native/google-maps';

import { SearchEventPage } from '../search-event/search-event';
import { CreateEventPage } from '../create-event/create-event';
import { FirebaseListObservable } from "angularfire2/database";
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
  isCreating: boolean = false;
  events: FirebaseListObservable<any[]>

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public googleMaps: GoogleMaps,
    private _afDb: DatabaseProvider
  ) {
    this.platform.ready().then(() =>{
      this.events = _afDb.getEvents();
      this.loadMap();
    });
  }

  loadMap() {
    this.element = document.getElementById('map');
    this.map = this.googleMaps.create(this.element, {
      backgroundColor: 'white',
      controls: {
        compass: false,
        myLocationButton: true,
        indoorPicker: false,
        zoom: false
      }
    });

    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      this.getMyLocation();
    });
  }

  getMyLocation(){
    this.map.getMyLocation({enableHighAccuracy: true}).then((data) => {
      this.map.moveCamera({
        target: data.latLng,
        zoom: 16
      });
    });
  }

  togglePage(){
    this.isCreating = !this.isCreating;
  }

  createEvent(){
    this.map.getCameraPosition().then((data) => {
      this.togglePage();  
      this.navCtrl.push(CreateEventPage, {target: data.target, events: this.events});
    });
  }

  search(){
    this.navCtrl.push(SearchEventPage);
  }
}
