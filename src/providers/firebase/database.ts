import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
// import * as firebase from 'firebase/app';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DatabaseProvider {
  private events: FirebaseListObservable<any[]>

  constructor(afDb: AngularFireDatabase) {
   this.events = afDb.list('/events');
  }

  getEvents(): FirebaseListObservable<any[]>{
    return this.events;
  }

}