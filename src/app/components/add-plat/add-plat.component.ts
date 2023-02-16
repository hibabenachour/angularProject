import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PlatService } from 'src/app/services/plat.service';

@Component({
  selector: 'app-add-plat',
  templateUrl: './add-plat.component.html',
  styleUrls: ['./add-plat.component.css']
})
export class AddPlatComponent implements OnInit {
  addPlatForm : FormGroup ;
  plat : any = {};
  id : any;
  title : any;
  plats : any ;
  imagePreview :any ;
  constructor(private formBuilder : FormBuilder,private activatedRoute :ActivatedRoute, private router : Router, private platService: PlatService) { }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    console.log(this.id);
    // this.plats = JSON.parse(localStorage.getItem("plats")|| "[]")
    if(this.id){
      this.title = "Edit Plat"
      this.platService.getPlat(this.id).subscribe(  (data)=>{
        console.log("data", data)
        this.plat =data.plat;
      })
     
      
      // for (var i = 0 ; i< this.plats.length; i++){
      //   if(this.plats[i].id == this.id){
      //     this.plat = this.plats[i]
      //   }
      //}
    }else{
      this.title = "Add Plat"
    }
    this.addPlatForm = this.formBuilder.group({
      platName : [''],
      price : [''],
      description : [''],
      img : ['']
      
    })
  }
  savePlat(){
    
    console.log(this.plat)
    let idPlat = JSON.parse(localStorage.getItem("idPlat")|| "1")
   
    let chefConnected = JSON.parse(localStorage.getItem("connectedUser"))
    if(this.id){
      //edit
      this.platService.updatePlat(this.plat).subscribe(
        (data)=> {
          console.log("plat updated", data.message)
        }
      )
      // for (var i = 0 ; i< this.plats.length; i++){
      //   if(this.plats[i].id == this.id){
      //   this.plats[i] = this.plat ;
      //   break;
      //   }
      // }
      // localStorage.setItem("plats",JSON.stringify(this.plats))
    } else {
      //add
      this.plat.id = idPlat;
      console.log("chefConnected", chefConnected)
      this.plat.idChef = chefConnected._id ;
    
      this.platService.createPlat(this.plat , this.addPlatForm.value.img).subscribe(
        (data)=> {
          console.log("plat created", data.message)
        })
      //this.plats.push(this.plat);
      // localStorage.setItem("plats",JSON.stringify(this.plats))
      // localStorage.setItem("idPlat",idPlat + 1)
    }
    this.router.navigate(['dashboardChef'])

  }
  onImageSelected(event: Event) {
    //Selection du fichier
    const file = (event.target as HTMLInputElement).files[0];
    // Ajout d'un attribut img dans l'objet Chef
    this.addPlatForm.patchValue({ img: file });
    // Mise à jour des valeurs du form
    this.addPlatForm.updateValueAndValidity();
    // Creation d'une variable reader pour lire le contenu de fichiers
    const reader = new FileReader();
    //Déclenchement du event load lors d'une lecture de fichier avec succès
    reader.onload = () => {
    //affecter le résultat de la lecture dans la variable imagePreview
    this.imagePreview = reader.result as string
    };
    // lecture du contenu du fichier Blob ou File
    reader.readAsDataURL(file);
  }

}
