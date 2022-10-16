import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-animacion',
  templateUrl: './animacion.page.html',
  styleUrls: ['./animacion.page.scss'],
})
export class AnimacionPage implements OnInit {

  constructor(public router:Router) { 
    setTimeout(()=>{
      this.router.navigateByUrl('login');
    },1000)

  }

  ngOnInit() {
  }

}
