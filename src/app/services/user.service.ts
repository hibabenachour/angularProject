import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
//   SERVER_URL: string = "http://localhost:8080/api/";
  SERVER_URL: string = "http://localhost:3000/users";

  constructor(private httpClient : HttpClient) {}
public getUsers(){ 
    return this.httpClient.get<{users : any}>(this.SERVER_URL);
}

public getUser(userId){
    return this.httpClient.get<{user : any}>(`${this.SERVER_URL}/${userId}`); 
}
public getUsersByRole(userRole){
   return this.httpClient.get<{users : any}>(`${this.SERVER_URL + '/getUserByRole'}/${userRole}`); 
}
public createUser(user){
   return this.httpClient.post<{message : any}>(`${this.SERVER_URL}`, user)
}

public deleteUser(userId){
   return this.httpClient.delete<{message : any}>(`${this.SERVER_URL}/${userId}`)
}
public updateUser(user){
   return this.httpClient.put<{message : any}>(`${this.SERVER_URL}/${user._id}`, user)
}
public login(user){
   return this.httpClient.post<{message : any, findedUser :any}>(`${this.SERVER_URL + '/login'}`, user)
}
public getPdf(){
   return this.httpClient.get<{message : any}>(`${this.SERVER_URL + '/generatePdf'}`)
}

public saveDataInCSV(users): string {
   if (users.length == 0) {
     return '';
   }

   let propertyNames = Object.keys(users[0]);
   let rowWithPropertyNames = propertyNames.join(',') + '\n';

   let csvContent = rowWithPropertyNames;

   let rows: string[] = [];

   users.forEach((item) => {
     let values: string[] = [];

     propertyNames.forEach((key) => {
       let val: any = item[key];

       if (val !== undefined && val !== null) {
         val = new String(val);
       } else {
         val = '';
       }
       values.push(val);
     });
     rows.push(values.join(','));
   });
   csvContent += rows.join('\n');

   return csvContent;
 }
}
