import { Injectable } from '@angular/core';
import { product } from './applications';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})

export class ApplicationsService {
    productList: AngularFireList<any>;
    productRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase,private ngFirestore: AngularFirestore) { }

  getProductist() {
    return this.ngFirestore.collection('Applications').snapshotChanges();
  }

  createProduct(app: any) {
    return this.ngFirestore.collection('Applications').add(app);
  }
  removeProduct(appid) {
    return this.ngFirestore.doc('Applications' + '/' + appid).delete();
  }

  updateProduct(appid, updatedata: any) {
    return this.ngFirestore.doc('Applications' + '/' + appid).update(updatedata);
  }
}
