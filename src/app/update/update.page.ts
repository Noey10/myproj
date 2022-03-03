import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Corn } from '../models/corn.interface';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  editForm: FormGroup;
  id: any;
  userEmail: string;
  public corn: Corn;

  constructor(
    private fireService: FirestoreService,
    private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.fireService.getCornDetail(this.id).subscribe((data) => {
      this.editForm = this.formBuilder.group({
        seller: [data.seller],
        address: [data.address],
        phone: [data.phone],
        cornWeight: [data.cornWeight],
        cornHumidity: [data.cornHumidity],
        cornVariety: [data.cornVariety],
        buyer: [data.buyer],
        date: [data.date]
      });
    });
  }

  async ngOnInit() {
    this.editForm = this.formBuilder.group({
      seller: [''],
      address: [''],
      phone: [''],
      cornWeight: [''],
      cornHumidity: [''],
      cornVariety: [''],
      buyer: [''],
      date: ['']
    });
  }

  onSubmit() {
    this.fireService.update(this.id, this.editForm.value);
  }


}
