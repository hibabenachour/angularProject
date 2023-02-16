
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlatService {
//   SERVER_URL: string = "http://localhost:8080/api/";
  SERVER_URL: string = "http://localhost:3000/plats";

  constructor(private httpClient : HttpClient) {}
public getPlats(){ 
    return this.httpClient.get<{plats : any}>(this.SERVER_URL);
}
public getMyPlats(chefId){ 
  return this.httpClient.get<{myPlats : any}>(`${this.SERVER_URL + '/myPlats'}/${chefId}`);
}
public getPlat(platId){
  return this.httpClient.get<{plat : any}>(`${this.SERVER_URL}/${platId}`); 
}

// public getPlat(userId){
//     return this.httpClient.get<{user : any}>(`${this.SERVER_URL}/${userId}`); 
// }
public createPlat(plat , img : File){
  //on utilise form data si on a des données type file
  let formData = new FormData();
  formData.append('platName',plat.platName);
  formData.append('price',plat.price);
  formData.append('description',plat.description);
  formData.append('idChef',plat.idChef);

  formData.append('img',img);

   return this.httpClient.post<{message : any}>(`${this.SERVER_URL}`, formData)
}

public deletePlat(platId){
   return this.httpClient.delete<{message : any}>(`${this.SERVER_URL}/${platId}`)
}
public updatePlat(plat){
   return this.httpClient.put<{message : any}>(`${this.SERVER_URL}/${plat._id}`, plat)
}

}
