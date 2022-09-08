import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-taller',
  templateUrl: './taller.page.html',
  styleUrls: ['./taller.page.scss'],
})
export class TallerPage implements OnInit {
  data: any; 

  constructor(private activerouter: ActivatedRoute, private router:Router) {

    this.activerouter.queryParams.subscribe(params=>{
      if(this.router.getCurrentNavigation().extras.state){
        this.data=this.router.getCurrentNavigation().extras.state.user;
      }
      else{
        this.router.navigate(["/login"])
      }
    });

   }

  ngOnInit() {
  }

}
