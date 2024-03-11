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
  selector: 'app-updatealbum',
  templateUrl: './updatealbum.page.html',
  styleUrls: ['./updatealbum.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class UpdatealbumPage implements OnInit {

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
    this.getArtists();
    let token = await this.storage.get('token')
    this.api.getAlbumsbyId(token, this.id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.title = res.data[0].title;
        this.description = res.data[0].description;
        this.year = res.data[0].year;
        this.artist_id = res.data[0].artist_id;
      },
      error:(err:any)=>
      console.log(err)
    })
    console.log("Este es tu id "+this.id)
  }

  title="";
  description="";
  year="";
  artist_id="";
  albumId: string = "";

  async updateAlbum() {
    const token = await this.storage.get('token');
  
    if (this.title || this.description || this.year || this.artist_id) {
      const albumDataToUpdate: any = {};
  
      if (this.title) {
        albumDataToUpdate.title = this.title;
      }
      if (this.description) {
        albumDataToUpdate.description = this.description;
      }
      if (this.year) {
        albumDataToUpdate.year = this.year;
      }
      if (this.artist_id) {
        albumDataToUpdate.artist_id = this.artist_id;
      }

      const albumId = this.route.snapshot.paramMap.get('id');
  
      if (albumId) {
        this.api.updateAlbum(albumId, albumDataToUpdate, token).subscribe({
          next: (res: any) => {
            console.log(res);
            if (res.token) {
              this.storage.set('token', res.token);
              this.presentToast('middle', 'Álbum actualizado correctamente', 'success', 'checkmark-circle-outline');
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
        this.presentToast('middle', 'No se pudo obtener el ID del álbum', 'danger', 'alert-circle-outline');
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
      let albumId = params['id']; 
    
      this.api.uploadFileAlbum(token, this.fileToUpload, albumId).subscribe({
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

  artist: any[] = [];

  async getArtists() {
    const token = await this.storage.get("token");
    this.api.getArtists(token).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res && res.results) {
          const data = res.results;
          
          this.artist.push(...data);
        } else {
          console.log("Error al traer los datos");
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }
  
}