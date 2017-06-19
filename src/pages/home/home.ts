import { DatabaseProvider } from './../../providers/firebase/database';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { GoogleMaps, GoogleMap, GoogleMapsEvent, MarkerOptions, Marker, LatLng } from '@ionic-native/google-maps';

import { SearchEventPage } from '../search-event/search-event';
import { CreateEventPage } from '../create-event/create-event';
import { EventDetailsPage } from '../event-details/event-details';

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
  isCreating: boolean;
  events: FirebaseListObservable<any[]>;
  eventMarkersMap: Map<string, Object>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public googleMaps: GoogleMaps,
    private _afDb: DatabaseProvider
  ) {
    this.events = this._afDb.getEvents();

    this.events.subscribe((events) => {
      events.forEach((event) => {
        this.createEventMarker(event);
      });
    });
  }

  //Map should be load here because this method run only once as long as page is instanced and cached.
  ionViewDidLoad() {
    this.loadMap();
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
    this.eventMarkersMap = new Map();
    let arr_latlng = event.latlng.split(',');
    let latlng = new LatLng(arr_latlng[0], arr_latlng[1]);
    let markerOptions: MarkerOptions = {
      position: latlng,
      title: event.name + " - " + event.type,
      infoClick: () => {
        this.navCtrl.push(EventDetailsPage, {event: event});
      }
    };
    this.map.addMarker(markerOptions).then((marker: Marker) => {
      this.eventMarkersMap.set(event.$key, marker);
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
