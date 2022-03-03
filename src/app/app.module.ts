import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { GoogleMaps } from '@ionic-native/google-maps';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { environment } from '../environments/environment';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { firebaseConfig } from './credentials';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireModule,
    AngularFireDatabaseModule, CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, GoogleMaps, Geolocation,
    NativeGeocoder, ImagePicker,File,
    FileOpener,PDFGenerator,],
  bootstrap: [AppComponent],
})
export class AppModule {}
