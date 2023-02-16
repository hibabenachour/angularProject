import { Component,Input,Output,EventEmitter, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chef',
  templateUrl: './chef.component.html',
  styleUrls: ['./chef.component.css']
})
export class ChefComponent implements OnInit {
 @Input() childChef : any;
 @Output() newChefs = new EventEmitter <any> ();
  constructor(private userService : UserService) { }

  ngOnInit(): void {
   
  }
  deleteChef(id){
    // let users = JSON.parse(localStorage.getItem("users")|| "[]");
    // let pos ;
    // for (let i = 0; i < users.length; i++) {
    //   if(users[i] == id) {
    //     pos = i ;
    //   }
      
    // }
    // users.splice(pos,1);
    // localStorage.setItem("users", JSON.stringify(users));
    // //Declanchement de l'event
    // this.newChefs.emit(users);
    this.userService.deleteUser(id).subscribe(
      (res)=>{
        console.log(res.message)
        this.userService.getUsersByRole("chef").subscribe((data)=>{
         //Declanchement de l'event
         this.newChefs.emit(data.users);
        })
      
         
          
          
      })
      
  }

}
