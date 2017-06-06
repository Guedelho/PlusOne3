import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchEventPage } from './search-event';

@NgModule({
  declarations: [
    SearchEventPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchEventPage),
  ],
  exports: [
    SearchEventPage
  ]
})
export class SearchEventPageModule {}
