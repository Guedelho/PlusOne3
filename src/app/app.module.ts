import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { LandingPage } from '../pages/landing/landing';
import { SearchEventPage } from '../pages/search-event/search-event';
import { CreateEventPage } from '../pages/create-event/create-event';
import { EventDetailsPage } from '../pages/event-details/event-details';
import { ForgetPasswordPage } from '../pages/forget-password/forget-password';

import { AuthProvider } from '../providers/firebase/auth';
import { AlertUtil } from '../util/alert-util';

import { GoogleMaps } from '@ionic-native/google-maps';
import { Camera } from '@ionic-native/camera';
import { NativeGeocoder } from '@ionic-native/native-geocoder';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatabaseProvider } from '../providers/firebase/database';

const FIREBASECONFIG = {
  apiKey: "AIzaSyBNLPcLkM4XY5yEdpLeXWznecZMmd--R9c",
  authDomain: "plus-one-561dc.firebaseapp.com",
  databaseURL: "https://plus-one-561dc.firebaseio.com",
  projectId: "plus-one-561dc",
  storageBucket: "plus-one-561dc.appspot.com",
  messagingSenderId: "514249091429"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    LandingPage,
    SearchEventPage,
    CreateEventPage,
    EventDetailsPage,
    ForgetPasswordPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASECONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    LandingPage,
    SearchEventPage,
    CreateEventPage,
    EventDetailsPage,
    ForgetPasswordPage
  ],
  providers: [
    AlertUtil,
    StatusBar,
    SplashScreen,
    AuthProvider,
    DatabaseProvider,
    GoogleMaps,
    Camera,
    NativeGeocoder,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
