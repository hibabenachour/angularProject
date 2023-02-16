import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {UserService } from 'src/app/services/user.service';
import {PlatService } from 'src/app/services/plat.service';



@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
users : any ;
user : any ;

plats : any ;
  constructor(private router : Router ,  private userService : UserService , private platService: PlatService) { }

  ngOnInit(): void {
  
    this.userService.getUsers().subscribe((data)=>{
      console.log(data.users);
      this.users = data.users;
      
  })
  this.platService.getPlats().subscribe((data)=>{
    console.log(data.plats);
    this.plats = data.plats;
    
})

 




    //this.users = JSON.parse(localStorage.getItem("users")|| "[]")
    //this.plats = JSON.parse(localStorage.getItem("plats")|| "[]")
    //console.log("userssss", this.users)
    //console.log("platssssssss", this.plats)

    // code remplacé par ng for et ng if html
    // for (var j = 0 ; j< this.users.length; j++){
    //   console.log("here",this.users[j].firstName )
    //   for (var i = 0 ; i< this.plats.length ; i++){
    //     if(this.plats[i].idChef == this.users[j].id){
    //       console.log("here",this.users[j].firstName )
    //       this.plats[i].idChef = this.users[j].firstName +"  " + this.users[j].lastName
    //     }
    //   }
    // }
   

  }
  // deleteUser(id, role){
  //   let pos;
  //   for (var i = 0 ; i < this.users.length; i++){
  //     if(this.users[i].id == id){
       
  //       pos = i ;
  //     }
  //   }
  //   this.users.splice(pos,1);
  //   if(role == "chef"){
  //     let newPlats = [];
  //     for (var i = 0 ; i < this.plats.length; i++){
  //       if(this.plats[i].idChef != id){
  //         newPlats.push(this.plats[i])
  //       }
  //     }
  //     localStorage.setItem("plats",JSON.stringify(newPlats))

  //   }
  //   localStorage.setItem("users",JSON.stringify( this.users))
   
    

  // }
  deleteUser(id){
   
      this.userService.deleteUser(id).subscribe(
        (data)=>{
          console.log(data)
          this.userService.getUsers().subscribe((data)=>{
            console.log(data.users);
            this.users = data.users;
            
        })
        }
   
      )
    

  }
  editUser(id,role){
    if(role == "chef"){
      this.router.navigate([`editChef/${id}`])
    }else {
      this.router.navigate([`editUser/${id}`])

    }
    
  }

  getColor(speciality){
    switch (speciality) {
      case 'TN':
        return "red" ;
        
      case 'FR' :
        return "blue" ;
      
      case 'IT' :
        return "green" ;
        
     
    }
  }
  displayUser(id){
    this.router.navigate([`displayUser/${id}`])
  }
  getPdf(){
    this.userService.getPdf().subscribe(
      (data)=>{
      console.log(data.message);
      }
      )
      
  }
  public saveDataInCSV(name: string): void {
    let csvContent = this.userService.saveDataInCSV(this.users);

    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvContent);
    hiddenElement.target = '_blank';
    hiddenElement.download = name + '.csv';
    hiddenElement.click();
  }

}

