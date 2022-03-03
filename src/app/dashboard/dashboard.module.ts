import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { DashboardPage } from './dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DashboardPageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [DashboardPage]
})
export class DashboardPageModule {}
