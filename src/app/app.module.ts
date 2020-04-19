import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {CreateGameModule} from '../components/create-game/create-game.module';
import {MessageModule} from '../lib/message/message.module';
import {ApiModule} from '../shared/services/api-service/api.module';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';

import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ApiModule.forRoot(environment.apiUrl),
    CreateGameModule,
    MessageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
