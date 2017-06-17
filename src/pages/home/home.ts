import { DatabaseProvider } from './../../providers/firebase/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';

import { GoogleMaps, GoogleMap, GoogleMapsEvent, MarkerOptions, Marker, LatLng } from '@ionic-native/google-maps';

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
  events: FirebaseListObservable<any[]>;
  eventMarkersMap: Map<string, Object>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public googleMaps: GoogleMaps,
    private _afDb: DatabaseProvider
  ) {
    this.platform.ready().then(() =>{
      this.events = _afDb.getEvents();
      this.eventMarkersMap = new Map();

      this.loadMap();

      //Create event marker for each event that will be showing through Firebase events listener
      this.events.subscribe((events) => {
        events.forEach((event) => {
          this.createEventMarker(event);
        });
      });
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

  createEventMarker(event) {
    if(!this.hasEvent(event)){
      let arr_latlng = event.latlng.split(',');
      let latlng = new LatLng(arr_latlng[0], arr_latlng[1]);
      let markerOptions: MarkerOptions = {
        position: latlng,
        title: event.name
      };
      this.map.addMarker(markerOptions).then((marker: Marker) => {
        this.eventMarkersMap.set(event.$key, marker);
      });
    }
  }

  hasEvent(event): boolean{
    return typeof this.eventMarkersMap.get(event.$key) != 'undefined';
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
