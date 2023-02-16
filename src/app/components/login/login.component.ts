import { findNode } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm : FormGroup ;
  user : any = {};
  exists : boolean = true ;
  constructor(private formBuilder : FormBuilder, private router : Router, private userService : UserService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      
    
      email : [''],
      password : ['']
     
    })
  }
  login(){
    this.userService.login(this.user).subscribe((data)=>{
      console.log(data.message);
      console.log(data.findedUser);
      if(data.findedUser){
            localStorage.setItem('connectedUser', JSON.stringify(data.findedUser))
            //redirection
            switch(data.findedUser.role){
              case 'admin': 
              this.router.navigate(['dashboardadmin']);
              break;
              case 'chef': 
              this.router.navigate(['dashboardChef']);
              break;
              case 'client': 
              this.router.navigate(['']);
              break;
            }
          }else {
            this.exists  = false ;
          }
      
      
      
  })
  }
  // login(){
  //   console.log(this.user)
  //   //let idUser = JSON.parse(localStorage.getItem("idUser")|| "1")
  //   let users = JSON.parse(localStorage.getItem("users")|| "[]")
  //   //this.user.id = idUser;
  //   //this.user.role = "admin";
  //   let findedUser;
  //   for(let i= 0 ;i < users.length ; i++){
  //     if(users[i].email == this.user.email && users[i].password == this.user.password) {
  //       findedUser = users[i];
  //       break;
        
  //     }
  //   }
  //   if(findedUser){
  //     localStorage.setItem('connectedUser', JSON.stringify(findedUser))
  //     //redirection
  //     switch(findedUser.role){
  //       case 'admin': 
  //       this.router.navigate(['dashboardadmin']);
  //       break;
  //       case 'chef': 
  //       this.router.navigate(['dashboardChef']);
  //       break;
  //       case 'client': 
  //       this.router.navigate(['']);
  //       break;
  //     }
  //   }else {
  //     this.exists  = false ;
  //   }

  //   // users.push(this.user);
  //   // localStorage.setItem("users",JSON.stringify(users))
  //   // localStorage.setItem("idUser",idUser + 1)

  // }

}
