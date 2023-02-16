import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 //declaration des variables globales  
  x:any;
  constructor() { }
//fonction qui s'execute une seule fois des le lancemnet du conposant
  ngOnInit(): void {
  }
  somme(a,b){
    //declaration des variables locales
    let x : any;
    return a+b ;
  }


}
