import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ApplicationsService } from './ApplicationsService';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.page.html',
  styleUrls: ['./applications.page.scss'],
})

export class ApplicationsPage implements OnInit {
  appobj: any;
  search: any;

  constructor(private apiService: ApplicationsService, public myrouter: Router, public alertCtrl: AlertController) {}


  ngOnInit() {
    this.apiService.getProductist().subscribe((res) => {
      this.appobj = res.map((t) => ({
        id: t.payload.doc.id,
        name: t.payload.doc.data()['name'.toString()],
        email: t.payload.doc.data()['email'.toString()],
        position: t.payload.doc.data()['position'.toString()],
        age: t.payload.doc.data()['age'.toString()],
        gender: t.payload.doc.data()['gender'.toString()],
        phone: t.payload.doc.data()['phone'.toString()],
      }));
      console.log(this.appobj );
    });
  }

  // showinfo(tmpitem: any){
  //   const data = JSON.stringify(tmpitem);
  //   this.myrouter.navigate(['dbhomepageresult', data]);
  // }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  async Add() {
    const alert = this.alertCtrl.create({
      header: 'Apply Application',
      inputs: [
        {
          name: 'name',
          placeholder: 'Enter your Name'
        },
        {
          name: 'email',
          placeholder: 'Enter your Email'
        },
        {
          name: 'position',
          placeholder: 'Position do you want?'
        },
        {
          name: 'age',
          placeholder: 'What about your age?'
        },
        {
          name: 'gender',
          placeholder: 'Male or Female?'
        },
        {
          name: 'phone',
          placeholder: 'Your phone number?'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (data: any) => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add',
          handler: data => {
            // eslint-disable-next-line radix
            const price = parseInt(data.Productprice);
            const count = parseInt(data.Productcount, 10);
            const app = {};
            app['name'.toString()] = data.name;
            app['email'.toString()] = data.email;
            app['position'.toString()] = data.position;
            app['age'.toString()] = data.age;
            app['gender'.toString()] = data.gender;
            app['phone'.toString()] = data.phone;
            this.apiService.createProduct(app);
          }
        }
      ]
    });
    (await alert).present();
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  async Del(appid) {
    const alert = this.alertCtrl.create({
      header: 'Delete',
      message: 'Do you want to Delete',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.apiService.removeProduct(appid);
          }
        }
      ]
    });
    (await alert).present();
  }

  // eslint-disable-next-line @typescript-eslint/naming-convention
  async Edit(app) {
    const alert = this.alertCtrl.create({
      subHeader: 'Edit',
      message: 'Now you are editing '+name,
      inputs: [
        {
          name: 'name',
          value: app.name
        },
        {
          name: 'email',
          value: app.email
        },
        {
          name: 'position',
          value: app.position
        },
        {
          name: 'age',
          value: app.age
        },
        {
          name: 'gender',
          value: app.gender
        },
        {
          name: 'phone',
          value: app.phone
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Update',
          handler: data => {
            const updatedata = {};
             updatedata['name'.toString()] = data.name;
             updatedata['email'.toString()] = data.email;
             updatedata['position'.toString()] = data.position;
             updatedata['age'.toString()] = data.age;
             updatedata['gender'.toString()] = data.gender;
             updatedata['phone'.toString()] = data.phone;
             this.apiService.updateProduct(app.id, updatedata);
             console.log(updatedata);
          }
        }
      ]
    });
    (await alert).present();
  }

}

