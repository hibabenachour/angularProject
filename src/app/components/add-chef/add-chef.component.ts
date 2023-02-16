import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-chef',
  templateUrl: './add-chef.component.html',
  styleUrls: ['./add-chef.component.css']
})
export class AddChefComponent implements OnInit {
  addChefForm : FormGroup ;
  chef : any = {};
  id : any;
  title : any;
  users : any;
  user : any = {};

  constructor(private formBuilder : FormBuilder,private userService : UserService, private activatedRoute :ActivatedRoute,private router : Router) { }

  ngOnInit(): void {
    //this.users = JSON.parse(localStorage.getItem("users")|| "[]")
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    console.log(this.id);
    if(this.id){
      this.title = "Edit Chef"
      
      this.userService.getUser(this.id).subscribe(
        (data)=>{
          console.log("data", data)
          this.chef =data.user ;
        }
    
      )
      // for (var i = 0 ; i< this.users.length; i++){
      //   if(this.users[i].id == this.id){
      //     this.chef = this.users[i]
      //   }
      // }
    }else{
      this.title = "Add Chef"
    }


    this.addChefForm = this.formBuilder.group({
      firstName : [''],
      lastName : [''],
      email : [''],
      password : [''],
      tel : [''],
      speciality : [''],
      experience : [''],
      dateOfBirth : ['']
    })

  } 
  
  saveChef(){
    if(this.id){
      //edit
      this.userService.updateUser(this.chef).subscribe(
        (data)=> {
          console.log("user updated", data.message)
        }
      )
      // for (var i = 0 ; i< this.users.length; i++){
      //   if(this.users[i].id == this.id){
      //   this.users[i] = this.chef ;
      //   break;
      //   }
      // }
      //localStorage.setItem("users",JSON.stringify(this.users))
    }else {
      //add
      console.log(this.chef)
      this.chef.role = "chef"
      this.userService.createUser(this.chef).subscribe(
        (data)=> {
          console.log("user created",data.message)
        })
      // let idUser = JSON.parse(localStorage.getItem("idUser")|| "1")
      // this.chef.id = idUser;
      // this.chef.role = "chef";
      // this.users.push(this.chef);
      // localStorage.setItem("users",JSON.stringify(this.users))
      // localStorage.setItem("idUser",idUser + 1)
    }
    this.router.navigate(['dashboardadmin'])
  }

}
