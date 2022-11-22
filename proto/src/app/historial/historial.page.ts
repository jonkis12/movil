import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { DbService } from './../services/db.service';
import { ToastController } from '@ionic/angular';
import { Router } from "@angular/router";
@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  mainForm: FormGroup;
  Data: any[] = []

  constructor(
    private db: DbService,
    public formBuilder: FormBuilder,
    private toast: ToastController,
    private router: Router
  ) { }
  
  ngOnInit() {
    this.db.dbState().subscribe((res) => {
      if(res){
        this.db.fetchScaneos().subscribe(item => {
          this.Data = item
        })
      }
    });
    this.mainForm = this.formBuilder.group({
      datos: [''],
      fecha: ['']
    })
  }
  storeData() {
    this.db.addScaneo(
      this.mainForm.value.artist,
      this.mainForm.value.song
    ).then((res) => {
      this.mainForm.reset();
    })
  }
  deleteSong(id){
    this.db.deleteScaneo(id).then(async(res) => {
      let toast = await this.toast.create({
        message: 'Scaneo deleted',
        duration: 2500
      });
      toast.present();      
    })
  }
   
}
