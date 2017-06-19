import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { DatabaseProvider } from './../../providers/firebase/database';

import { EventDetailsPage } from '../event-details/event-details';

/**
 * Generated class for the SearchEventPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-search-event',
  templateUrl: 'search-event.html',
})
export class SearchEventPage {

  @ViewChild('input') input;
  events: any;
  eventsTmp: any;
  search: string = "";

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private _afDb: DatabaseProvider
  ) {
    this._afDb.getEvents().subscribe((data) =>{
      this.events = this.eventsTmp = data;
    });
  }

  detalhes(i){
    this.navCtrl.push(EventDetailsPage, {event: this.events[i]});
  }

  filter(){
    this.eventsTmp = this.events;
    this.eventsTmp = this.eventsTmp.filter((item) => {
        return item.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1  || item.type.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
    });  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchEventPage');
    setTimeout(() =>{
      this.input.setFocus();
    }, 1000)
  }

}
