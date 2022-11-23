import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { DbService } from './../services/db.service';
import { ToastController } from '@ionic/angular';
import { Router } from "@angular/router";

import { StorageService } from '../storage.service';
import  { Platform, IonList } from '@ionic/angular';

import { CrudService } from '../services/crud.service';
@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {
  
  datoss = this.crud.listar();


  constructor(private crud: CrudService
  ) { }
  
  async agregar(txtID:HTMLInputElement, txtLink:HTMLInputElement, txtFecha:HTMLInputElement)
  {
    const datos = [{"ID": txtID.value,
                    "Link": txtLink.value,
                    "Fecha": txtFecha.value}];
                    await this.crud.agregar(datos);
  };
  ngOnInit() {} 

}
