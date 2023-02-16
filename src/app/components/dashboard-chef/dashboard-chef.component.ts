import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlatService } from 'src/app/services/plat.service';

@Component({
  selector: 'app-dashboard-chef',
  templateUrl: './dashboard-chef.component.html',
  styleUrls: ['./dashboard-chef.component.css']
})
export class DashboardChefComponent implements OnInit {
  plats : any;
  connectedUser : any ;
  myPlats :any = [];
  constructor(private router : Router, private platService: PlatService) { }

  ngOnInit(): void {
    //let myPlats : [];
    //this.plats = JSON.parse(localStorage.getItem("plats")|| "[]")
    this.connectedUser = JSON.parse(localStorage.getItem("connectedUser"))
    console.log("this.connectedUser", this.connectedUser)
    this.platService.getMyPlats(this.connectedUser._id).subscribe((data)=>{
      this.myPlats = data.myPlats;
      console.log("this.plats",   this.myPlats)
    })
  //   this.platService.getPlats().subscribe((data)=>{
  //     console.log(data.plats);
  //     this.plats = data.plats;
  //     for(var i = 0; i<this.plats .length ; i++ ){
  //       console.log("myPlats[i]", this.plats[i].idChef)
  //       if (this.plats[i].idChef ==  this.connectedUser._id ){
  //         console.log("myPlats[i]", this.plats[i])
           
  //         this.myPlats.push(this.plats[i])
  //       }
  //     }
      
  // })
    
    //console.log("platChef",  this.plats)

  }
  deletePlat(id){
    let pos;
    // for (var i = 0 ; i < this.plats.length; i++){
    //   if(this.plats[i].id == id){
       
    //     pos = i ;
    //     break;
    //   }
    // }
    // this.plats.splice(pos,1);
    
    // localStorage.setItem("plats",JSON.stringify( this.plats))
    this.platService.deletePlat(id).subscribe(
      (data)=>{
        console.log(data.message)
        this.platService.getPlats().subscribe((data)=>{
          console.log(data.plats);
          this.myPlats = data.plats;
          
      })
      }
    )
   
    

  }
  editPlat(id){
   
      this.router.navigate([`addPlat/${id}`])
   
  }
  
}
