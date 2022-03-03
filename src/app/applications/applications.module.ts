import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FileSizePipe } from './file-size.pipe';
import { IonicModule } from '@ionic/angular';

import { ApplicationsPageRoutingModule } from './applications-routing.module';

import { ApplicationsPage } from './applications.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ApplicationsPageRoutingModule
  ],
  declarations: [ApplicationsPage,  FileSizePipe]
})
export class ApplicationsPageModule {}
