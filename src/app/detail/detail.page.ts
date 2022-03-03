/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Corn } from '../models/corn.interface';
import { FirestoreService } from '../services/firestore.service';
import { AlertController, LoadingController, NavController, Platform } from '@ionic/angular';
import { File, IWriteOptions } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { PDFGenerator } from '@ionic-native/pdf-generator/ngx';
import { jsPDF } from 'jspdf';
import domtoimage from 'dom-to-image';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  public corn: Corn;
  seller: string;
  address: string;
  phone: string;
  cornWeight: number;
  cornHumidity: number;
  cornVariety: string;
  buyer: string;
  date: string;
  earn: number;
  loading: any;
  content: string;

  constructor(private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private alertController: AlertController,
    private router: Router,
    public loadingCtrl: LoadingController,
    public acroute: ActivatedRoute,
    public navCtrl: NavController, private plt: Platform,
    private file: File,
    private fileOpener: FileOpener, private pdfGenerator: PDFGenerator) {

    const cornId: string = this.route.snapshot.paramMap.get('id');

    this.firestoreService.getCornDetail(cornId).subscribe(corn => {
      this.corn = corn;
      if(corn.cornHumidity > 1 && (corn.cornHumidity < 13.5 || corn.cornHumidity === 13.5)){
        this.earn = (8.5 * corn.cornWeight)*1000;
        console.log(this.earn);
      }else if(corn.cornHumidity > 13.5 && corn.cornHumidity < 15.5){
        this.earn = (8 * corn.cornWeight)*1000;
        console.log(this.earn);
      }else if((corn.cornHumidity > 15.5 || corn.cornHumidity === 15.5) && corn.cornHumidity < 18.5){
        this.earn = (7 * corn.cornWeight)*1000;
        console.log(this.earn);
      }else if((corn.cornHumidity > 18.5 || corn.cornHumidity === 18.5) && corn.cornHumidity < 20.5){
        this.earn = (6 * corn.cornWeight)*1000;
        console.log(this.earn);
      }else {
        this.earn = (5.5 * corn.cornWeight)*1000;
        console.log(this.earn);
      }
    });
  }

  ngOnInit() {
    const cornId: string = this.route.snapshot.paramMap.get('id');
    this.firestoreService.getCornDetail(cornId).subscribe(corn => {
      this.corn = corn;
    });
  }

  async deleteCorn(cornId: string, seller: string): Promise<void> {
    const alert = await this.alertController.create({
      message: `คุณต้องการลบข้อมูลของคุณ ${seller}?`,
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          handler: blah => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'ตกลง',
          handler: () => {
            this.firestoreService.deleteCorn(cornId).then(() => {
              this.router.navigateByUrl('/dashboard');
            });
          },
        },
      ],
    });
    await alert.present();
  }

  toPdf(seller: string) {
    const dashboard = document.getElementById('dashboard');

    const dashboardHeight = dashboard.clientHeight;
    const dashboardWidth = dashboard.clientWidth;
    const options = { background: 'white', width: dashboardWidth, height: dashboardHeight };

    domtoimage.toPng(dashboard, options).then((imgData) => {
         const doc = new jsPDF(dashboardWidth > dashboardHeight ? 'l' : 'p', 'mm', [dashboardWidth, dashboardHeight]);
         const imgProps = doc.getImageProperties(imgData);
         const pdfWidth = doc.internal.pageSize.getWidth();
         const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

         doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
         doc.save(`ใบเสร็จของคุณ${seller}.pdf`);
    });
}

}

