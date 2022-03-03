import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { FirestoreService } from '../services/firestore.service';
import { Router } from '@angular/router';
import { ApplicationsService } from '../applications/ApplicationsService';
import { Observable } from 'rxjs';
import { Corn } from '../models/corn.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  userEmail: string;
  public createCornForm: FormGroup;
  obj: any;
  public cornList: Observable<Corn[]>;
  today: number = Date.now();
  search: string;
  seller: string;
  address: string;
  phone: string;
  cornWeight: number;
  cornHumidity: number;
  cornVariety: string;
  buyer: string;
  date: string;
  earn: number;

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticateService,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private firestoreService: FirestoreService,
    formBuilder: FormBuilder,
    private router: Router,
    public apiService: ApplicationsService,
  ) {
    this.createCornForm = formBuilder.group({
      seller: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      cornWeight: ['', Validators.required],
      cornHumidity: ['', Validators.required],
      cornVariety: ['', Validators.required],
      buyer: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  ngOnInit() {

    this.cornList = this.firestoreService.getCornList();

    this.authService.userDetails().subscribe(res => {
      console.log('res', res);
      if (res !== null) {
        this.userEmail = res.email;
      } else {
        this.navCtrl.navigateBack('');
      }
    }, err => {
      console.log('err', err);
    });

  }

  async createCorn() {
    const loading = await this.loadingCtrl.create();

    const seller = this.createCornForm.value.seller;
    const address = this.createCornForm.value.address;
    const phone = this.createCornForm.value.phone;
    const cornWeight = this.createCornForm.value.cornWeight;
    const cornHumidity = this.createCornForm.value.cornHumidity;
    const cornVariety = this.createCornForm.value.cornVariety;
    const buyer = this.createCornForm.value.buyer;
    const date = this.createCornForm.value.date;

    this.firestoreService
    .createCorn(seller, address, phone, cornWeight, cornHumidity,
      cornVariety, buyer, date)
    .then(
      () => {
        loading.dismiss().then(() => {
          this.createCornForm.reset();
          // this.router.navigateByUrl('/detail');
        });
      },
      error => {
        loading.dismiss().then(() => {
          console.error(error);
        });
      }
    );

    return await loading.present();
  }

  logout() {
    this.authService.logoutUser()
      .then(res => {
        console.log(res);
        this.navCtrl.navigateBack('');
      })
      .catch(error => {
        console.log(error);
      });
  }

}
