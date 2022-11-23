import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import { ToastController, LoadingController, Platform } from '@ionic/angular';
import jsQR from 'jsqr';

//BDD
import { FormGroup, FormBuilder } from "@angular/forms";

//import { DbService } from './../services/db.service';
import { Router } from "@angular/router";

import { CrudService } from '../services/crud.service';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {
  scanActive=false;
  scanResult=null;

  @ViewChild('video', { static: false}) video: ElementRef;
  @ViewChild('canvas', { static: false}) canvas: ElementRef;

  videoElement: any;
  canvasElement: any;
  canvasContext: any;

  loading: HTMLIonLoadingElement;

  constructor(private toastCtrl: ToastController, private loadingCtrl:LoadingController, private crud:CrudService) { }

  async agregar(txtID:string, txtLink:string, txtFecha:string)
  {
    const datos = [{"ID": txtID,
                    "Link": txtLink,
                    "Fecha": txtFecha}];
                    await this.crud.agregar(datos);
  };
  


  ngAfterViewInit(){
    this.videoElement = this.video.nativeElement;
    this.canvasElement = this.canvas.nativeElement;
    this.canvasContext = this.canvasElement.getContext('2d');
  }

  ngOnInit() {
  }

  async startScan() {
    const stream= await navigator.mediaDevices.getUserMedia({
      video: {facingMode:'environment'}
    })
  this.videoElement.srcObject = stream;
  this.videoElement.setAttribute('playsinline', true);
  this.videoElement.play();
  this.loading = await this.loadingCtrl.create({});
  await this.loading.present();

  requestAnimationFrame(this.scan.bind(this));
  }

  async scan(){
    console.log('scan');
    if (this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA){
      if (this.loading){
        await this.loading.dismiss();
        this.loading = null;
        this.scanActive = true;
      }

      this.canvasElement.height = this.videoElement.videoHeight;
      this.canvasElement.width = this.videoElement.videoWidth;

      this.canvasContext.drawImage(
        this.videoElement,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );

      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height

      );

      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert'
      });
      console.log('code: ',code)

      if (code) {
        this.scanActive = false;
        this.scanResult = code.data;
        let num = this.getRandomInt(0,9999);
        let fecha = 'Noviembre 23';
        this.agregar(num.toString(), this.scanResult, fecha);
        this.showQrToast();
      } else {
        if (this.scanActive){
          requestAnimationFrame(this.scan.bind(this));
        }
      }
    } else{
      requestAnimationFrame(this.scan.bind(this));
    }
  }

  stopScan() {
    this.scanActive=false;
  }
  reset() {
    this.scanResult=null;
  }

  async showQrToast() {
    const toast = await this.toastCtrl.create({
      message: `Open ${this.scanResult}?`,
      position: 'top',
      buttons: [
        {
          text: 'Open',
          handler: () => {
            window.open(this.scanResult, '_system', 'location=yes');
          }
        }
      ]
    });
    toast.present();
  }
  async getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
  }
}

