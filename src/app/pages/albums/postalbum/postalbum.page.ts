import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { skullOutline, checkmarkCircleOutline, alertCircleOutline } from 'ionicons/icons';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-postalbum',
  templateUrl: './postalbum.page.html',
  styleUrls: ['./postalbum.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PostalbumPage implements OnInit {

  constructor(
    private storage:Storage, 
    private api:ApiService, 
    private toastController:ToastController,
    private router: Router) { 
    addIcons({skullOutline, checkmarkCircleOutline, alertCircleOutline});
    this.storage.create();
  }

  ngOnInit() {
    this.getArtists();
  }

  title="";
  description="";
  year="";
  artist_id="";

  async postAlbum() {
    const token = await this.storage.get('token')
    if (this.title && this.description && this.year && this.artist_id) {
  
      this.api.postAlbum(this.title, this.description, this.year, this.artist_id, token).subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.token) {
            this.storage.set('token', res.token);
            this.presentToast('middle', 'Álbum registrado correctamente', 'success', 'checkmark-circle-outline');
            this.router.navigateByUrl("/homealbum"); 
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
