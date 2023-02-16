import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chefs',
  templateUrl: './chefs.component.html',
  styleUrls: ['./chefs.component.css']
})
export class ChefsComponent implements OnInit {
  users : any ;
  chefs : any=[];
  constructor(private userService :UserService) { }

  ngOnInit(): void {
    console.log("hefreeeeeee")
    
    // this.users = JSON.parse(localStorage.getItem("users")|| "[]")
    // for (let i = 0; i < this.users.length; i++) {
    //   if (this.users[i].role == "chef") {
    //     this.chefs.push(this.users[i]);
        
    //   }
    //   console.log("this.chef", this.chefs)
    
      
    // }
    this.userService.getUsersByRole("chef").subscribe((data)=>{
      this.chefs = data.users;
      console.log("this.chefs", this.chefs)
    })
  }
  update(e){
    this.users = e;
    this.userService.getUsersByRole("chef").subscribe((data)=>{
      this.chefs = data.users;
      console.log("this.chefs", this.chefs)
    })
  }

}
