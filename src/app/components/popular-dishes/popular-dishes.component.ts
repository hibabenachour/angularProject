import { Component, OnInit } from '@angular/core';
import { PlatService } from 'src/app/services/plat.service';

@Component({
  selector: 'app-popular-dishes',
  templateUrl: './popular-dishes.component.html',
  styleUrls: ['./popular-dishes.component.css']
})
export class PopularDishesComponent implements OnInit {
plats : any ;
  constructor(private platService : PlatService ) { }

  ngOnInit(): void {
    //this.plats = JSON.parse(localStorage.getItem("plats")|| "[]")
    this.platService.getPlats().subscribe((data)=>{
      console.log(data.plats);
      this.plats = data.plats;
      
  })
   
  }
  update(e){
    this.plats = e ;
  }

}
