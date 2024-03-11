import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { skullOutline, checkmarkCircleOutline, alertCircleOutline } from 'ionicons/icons';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-postsong',
  templateUrl: './postsong.page.html',
  styleUrls: ['./postsong.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PostsongPage implements OnInit {

  constructor(private storage:Storage, private api:ApiService, private toastController:ToastController) { 
    addIcons({skullOutline, checkmarkCircleOutline, alertCircleOutline});
    this.storage.create();
  }

  ngOnInit() {
    this.getAlbums();
  }

  name="";
  number="";
  duration="";
  album_id="";

  async postSong() {
    const token = await this.storage.get('token')
    if (this.name && this.number && this.duration && this.album_id) {
  
      this.api.postSong(this.name, this.number, this.duration, this.album_id, token).subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.token) {
            this.storage.set('token', res.token);
            this.presentToast('middle', 'Canción registrado correctamente', 'success', 'checkmark-circle-outline');
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
      this.presentToast('middle', 'Por favor, completa todos los campos', 'warning', 'alert-circle-outline');
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
