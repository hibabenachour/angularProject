import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-binding',
  templateUrl: './binding.component.html',
  styleUrls: ['./binding.component.css']
})
export class BindingComponent implements OnInit {
title : String;
source : any ;
//ou bien title : String= "hello"
  constructor() { }

  ngOnInit() : void {
    this.title = "hello"
    this.source = "assets/img/logo.png";
  }
  clickMe(){
    alert("test");
  }

}
