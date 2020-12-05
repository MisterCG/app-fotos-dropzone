import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRountingModule } from './app-rounting.module';
// Firebase 
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

// enviroment
import { environment as env } from '../environments/environment';

import { AppComponent } from './app.component';
import { FotosComponent } from './pages/fotos/fotos.component';
import { UploadComponent } from './pages/upload/upload.component';
import { NavComponent } from './components/nav/nav.component';
import { DropZoneDirective } from './directive/drop-zone.directive';

@NgModule({
  declarations: [
    AppComponent,
    FotosComponent,
    UploadComponent,
    NavComponent,
    DropZoneDirective
  ],
  imports: [
    BrowserModule,
    AppRountingModule,
    AngularFireModule.initializeApp( env.firebaseConfig ),
    AngularFireStorageModule,
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
