import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root'
})
export class DataService  implements  InMemoryDbService{

  constructor() { }
  createDb(){

    let  users =  [
     {  id:  1,  firstName: "KAMEL", lastName: "KAMOULA", email: "KAMEL@CHEF.COM", password: "kamelkamel",tel:55648784, role : "chef" , speciality: "TN" ,dateOfBirth: "3/3/2000", experience : 3},
     {  id:  2,  firstName: "Joel", lastName: "joele", email: "jpel@CHEF.COM", password: "joel",tel:55648784, role : "admin"},
     {  id:  3,  firstName: "Mark", lastName: "marka", email: "mark@CHEF.COM", password: "mark",tel:55648784, role : "client"},];
 
    return {users};
 
   }
 
}
