import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  addAdminForm : FormGroup ;
  user : any = {};
  id : any;
  title : any;
  users : any;
  constructor(private formBuilder : FormBuilder,private userService : UserService, private activatedRoute :ActivatedRoute,private router : Router) { }

  ngOnInit(): void {
    //this.users = JSON.parse(localStorage.getItem("users")|| "[]")
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    console.log(this.id);
   
    if(this.id){
      this.title = "Edit User"
      this.userService.getUser(this.id).subscribe(
        (data)=>{
          this.user =data.user ;
          console.log("this.user" , this.user)
        }
    
      )
      // for (var i = 0 ; i< this.users.length; i++){
      //   if(this.users[i].id == this.id){
      //     this.user = this.users[i]
      //   }
      // }
    }else{
      this.title = "Add User"
    }
    this.addAdminForm = this.formBuilder.group({
      firstName : [''],
      lastName : [''],
      email : [''],
      password : [''],
      tel : ['']
    })
  }
  saveUser(){
    if(this.id){
      //edit
      this.userService.updateUser(this.user).subscribe(
        (data)=> {
          console.log("user updated", data.message)
        }
      )
      // for (var i = 0 ; i< this.users.length; i++){
      //   if(this.users[i].id == this.id){
      //   this.users[i] = this.user ;
      //   break;
      //   }
      // }
      // localStorage.setItem("users",JSON.stringify(this.users))
    }else {
      //add
      console.log(this.user)
      this.user.role = "admin";
      this.userService.createUser(this.user).subscribe(
        (data)=> {
          console.log("user created", data.message)
        })
      // let idUser = JSON.parse(localStorage.getItem("idUser")|| "1")
      // this.user.id = idUser;
      // this.user.role = "admin";
      // this.users.push(this.user);
      // localStorage.setItem("users",JSON.stringify(this.users))
      // localStorage.setItem("idUser",idUser + 1)
    }
    this.router.navigate(['dashboardadmin'])  
  }
  
  // addAdmin(){
  //   console.log(this.user)
  //   let idUser = JSON.parse(localStorage.getItem("idUser")|| "1")
  //   let users = JSON.parse(localStorage.getItem("users")|| "[]")
  //   this.user.id = idUser;
  //   this.user.role = "admin";

  //   users.push(this.user);
  //   localStorage.setItem("users",JSON.stringify(users))
  //   localStorage.setItem("idUser",idUser + 1)

  // }

}
