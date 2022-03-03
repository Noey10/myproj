import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import 'firebase/firestore';
import { Observable } from 'rxjs';
import { Corn } from '../models/corn.interface';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  [x: string]: any;
  cornList: AngularFireList<any>;
  cornRef: AngularFireObject<any>;
  id: string;
  seller: string;
  address: string;
  phone: string;
  cornWeight: number;
  cornHumidity: number;
  cornVariety: string;
  buyer: string;
  date: string;

  constructor(public firestore: AngularFirestore) {}

  createCorn(
    seller: string,
    address: string,
    phone: string,
    cornWeight: number,
    cornHumidity: number,
    cornVariety: string,
    buyer: string,
    date: string,
  ): any {
    const id = this.firestore.createId();

    return this.firestore.doc(`cornList/${id}`).set({
      id,
      seller,
      address,
      phone,
      cornWeight,
      cornHumidity,
      cornVariety,
      buyer,
      date,
    });

  }

  update(id, corn: Corn) {
    return this.firestore.collection('cornList').doc<Corn>(id).update(corn);
  }


  getCornList(): Observable<Corn[]> {
    return this.firestore.collection<Corn>('cornList').valueChanges();
  }

  getCornDetail(cornId: string): Observable<Corn> {
    return this.firestore.collection('cornList').doc<Corn>(cornId).valueChanges();
  }

  deleteCorn(cornId: string): Promise<void> {
    return this.firestore.collection('cornList').doc<Corn>(cornId).delete();
  }
}
