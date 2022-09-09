import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import{Router, NavigationExtras} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public navCtrl: NavController,
    private router: Router) {}

  ionViewDidLoad() {
    console.log('Hello GeneralMyprofilePage Page');
  }
  ingresar(){

    let navigationExtras:NavigationExtras={

    };
    this.router.navigate(['/taller'],navigationExtras)
  }

}
