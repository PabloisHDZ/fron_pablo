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
  selector: 'app-updatesong',
  templateUrl: './updatesong.page.html',
  styleUrls: ['./updatesong.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class UpdatesongPage implements OnInit {

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
    this.getAlbums();
    let token = await this.storage.get('token')
    this.api.getSongbyId(token, this.id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.name = res.data[0].name;
        this.duration = res.data[0].duration;
        this.number = res.data[0].number;
        this.album_id = res.data[0].album_id;
      },
      error:(err:any)=>
      console.log(err)
    })
    console.log("Este es tu id "+this.id)
  }

  name="";
  number="";
  duration="";
  album_id="";
  songId: string = "";

  async updateSong() {
    const token = await this.storage.get('token');
  
    if (this.name || this.number || this.duration || this.album_id) {
      const songDataToUpdate: any = {};
  
      if (this.name) {
        songDataToUpdate.name = this.name;
      }
      if (this.number) {
        songDataToUpdate.number = this.number;
      }
      if (this.duration) {
        songDataToUpdate.duration = this.duration;
      }
      if (this.album_id) {
        songDataToUpdate.album_id = this.album_id;
      }

      const songId = this.route.snapshot.paramMap.get('id');
  
      if (songId) {
        this.api.updateSong(songId, songDataToUpdate, token).subscribe({
          next: (res: any) => {
            console.log(res);
            if (res.token) {
              this.storage.set('token', res.token);
              this.presentToast('middle', 'Canción actualizada correctamente', 'success', 'checkmark-circle-outline');
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
        this.presentToast('middle', 'No se pudo obtener el ID de la canción', 'danger', 'alert-circle-outline');
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

  async setSong(event:any){
    let token = await this.storage.get('token');
    this.fileToUpload = event.target.files[0];
    
    this.route.params.subscribe(params => {
      let songId = params['id']; 
    
      this.api.uploadFileSong(token, this.fileToUpload, songId).subscribe({
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

  album: any[] = [];

  async getAlbums() {
    const token = await this.storage.get("token");
    this.api.getAlbums(token).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res && res.results) {
          const data = res.results;
          
          this.album.push(...data);
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
