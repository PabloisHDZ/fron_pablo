import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { skullOutline, checkmarkCircleOutline, alertCircleOutline, closeCircleOutline } from 'ionicons/icons';
import { Storage } from '@ionic/storage-angular';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updateartist',
  templateUrl: './updateartist.page.html',
  styleUrls: ['./updateartist.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class UpdateartistPage implements OnInit {

  id:string;

  constructor(
    private storage:Storage, 
    private api:ApiService, 
    private toastController:ToastController, 
    private route: ActivatedRoute,
    private router: Router) { 
    addIcons({skullOutline, checkmarkCircleOutline, alertCircleOutline, closeCircleOutline});
    this.storage.create();
    this.id = route.snapshot.paramMap.get('id') as string;
  }

  async ngOnInit() {
    let token = await this.storage.get('token')
    this.api.getArtistsbyId(token, this.id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.name = res.data[0].name;
        this.description = res.data[0].description;
      },
      error:(err:any)=>
      console.log(err)
    })
    console.log("Este es tu id "+this.id)
  }
  

  name="";
  description="";
  artistId: string = "";

  async updateArtist() {
    const token = await this.storage.get('token');
  
    if (this.name || this.description) {
      const artistDataToUpdate: any = {};
  
      if (this.name) {
        artistDataToUpdate.name = this.name;
      }
  
      if (this.description) {
        artistDataToUpdate.description = this.description;
      }

      const artistId = this.route.snapshot.paramMap.get('id');
  
      if (artistId) {
        this.api.updateArtist(artistId, artistDataToUpdate, token).subscribe({
          next: (res: any) => {
            console.log(res);
            if (res.token) {
              this.storage.set('token', res.token);
              this.presentToast('middle', 'Artista actualizado correctamente', 'success', 'checkmark-circle-outline');
              this.router.navigateByUrl('/homeartist');
            } else {
              this.presentToast('middle', res.message, 'warning', 'checkmark-circle-outline');
            }
          },
          error: (error: any) => {
            console.log(error);
            this.presentToast('middle', 'Error, intenta más tarde', 'danger', 'skull-outline');
          }
        });
      } else {
        this.presentToast('middle', 'No se pudo obtener el ID del artista', 'danger', 'alert-circle-outline');
      }
    } else {
      this.presentToast('middle', 'Por favor, completa al menos un campo para actualizar', 'warning', 'alert-circle-outline');
    }
  }
  
  
  async presentToast(position: 'top' | 'middle' | 'bottom', msg:string, color:string, icon:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: position,
      color: color,
      mode:'ios',
      icon:icon
    });
    await toast.present();
  }

  fileToUpload: File | any;

  async setImage(event:any){
    let token = await this.storage.get('token');
    this.fileToUpload = event.target.files[0];
    
    this.route.params.subscribe(params => {
      let artistId = params['id']; 
    
      this.api.uploadFile(token, this.fileToUpload, artistId).subscribe({
        next: (res:any) => {
          console.log(res);
          this.presentToast('middle', res.message, 'success', 'checkmark-circle-outline');
        },
        error: (error:any) => {
          console.log(error);
          this.presentToast('middle', "No se subió nada", 'warning', 'close-circle-outline');
        }
      });
    });
  }

}
