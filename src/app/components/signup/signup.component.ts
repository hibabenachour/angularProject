import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MustMatch} from '../confirmPwd';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm :FormGroup ;
  test : boolean = true ;
  
  
  constructor(private formBuilder : FormBuilder,private userService : UserService, private router : Router) { }

  ngOnInit(): void {this.signupForm = this.formBuilder.group({
    firstName : ['',[Validators.required,Validators.minLength(3)]],
    lastName : ['',[Validators.required,Validators.minLength(5)]],
    email : ['',[Validators.required,Validators.email]],
    password : ['',[Validators.required,Validators.minLength(8)]],
    confirmPassword : [''],
    tel : ['',[/*Validators.required,Validators.minLength(8),Validators.maxLength(13),*/Validators.pattern("^((\\+91-?)|0)?[0-9]{8,13}$")]]
  },
  {
    validator : MustMatch('password','confirmPassword')
  })
 

  }
  signup(f:any){
    console.log(f)
  
      
      // let idUser = JSON.parse(localStorage.getItem("idUser")|| "1")
      // let users = JSON.parse(localStorage.getItem("users")|| "[]")
      // f.id = idUser;
      // f.role = "client";
  
      // users.push(f);
      // localStorage.setItem("users",JSON.stringify(users))
      // localStorage.setItem("idUser",idUser + 1)
      // this.router.navigate(['login'])

     
      f.role = "client"
      this.userService.createUser(f).subscribe(
        (data)=> {
          console.log(data.message)
          console.log("client created")
        })
  
    
  }

}
