import { Component, Input,Output, EventEmitter, OnInit } from '@angular/core';
import { PlatService } from 'src/app/services/plat.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.css']
})
export class DishComponent implements OnInit {
@Input()  childDish : any; 
@Output() newDishes = new EventEmitter <any> ();
users : any ;
  constructor(private userService : UserService , private platService : PlatService) { }

  ngOnInit(): void {
    //this.users = JSON.parse(localStorage.getItem("users")|| "[]")
    console.log("this.childDish", this.childDish)
    this.userService.getUsers().subscribe((data)=>{
      console.log(data.users);
      this.users = data.users;
      for (var j = 0 ; j< this.users.length; j++){
       
        console.log("eee",this.users[j].id)
           if(this.users[j]._id == this.childDish.idChef){
            
             this.childDish.idChef = this.users[j].firstName +"  " + this.users[j].lastName
             console.log("here", this.childDish.idChef )
           }
         
       }
 
  })
    
  }
  deletePlat(id){
    
    // let plats = JSON.parse(localStorage.getItem("plats")|| "[]");
    // let pos ;
    // for (let i = 0; i < plats.length; i++) {
    //   if(plats[i] == id) {
    //     pos = i ;
    //   }
      
    // }
    // plats.splice(pos,1);
    // localStorage.setItem("plats", JSON.stringify(plats));
    this.platService.deletePlat(id).subscribe(
      (data)=>{
        console.log(data.message)
        this.platService.getPlats().subscribe((data)=>{
          console.log(data.plats);
         
           //Declanchement de l'event
          this.newDishes.emit(data.plats);
          
      })
      }
    )
   
  }

}
