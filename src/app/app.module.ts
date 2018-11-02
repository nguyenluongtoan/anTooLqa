import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent }  from './app.component';
import { RatComponent }  from './components/rat.component';
import { CatComponent }  from './components/cat.component';
import { BatComponent }  from './components/bat.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, RatComponent, CatComponent, BatComponent],
  bootstrap:    [ AppComponent, RatComponent, CatComponent, BatComponent]
})
export class AppModule { }
