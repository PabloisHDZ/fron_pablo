import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ApiService } from '../../../services/api.service';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { addIcons } from 'ionicons';
import { skullOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-homealbum',
  templateUrl: './homealbum.page.html',
  styleUrls: ['./homealbum.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomealbumPage implements OnInit {

  constructor(private api:ApiService, private storage:Storage, private toastController:ToastController, private router: Router, private act:ActivatedRoute) {
    addIcons({skullOutline, checkmarkCircleOutline});
  }

  ngOnInit() {
    this.getAlbums();
    this.getUser();
  }
  url = environment.urlapi;
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

  async deleteAlbum(id: string) {
    try {
      const token = await this.storage.get('token');
    
      if (!token) {
        console.error('No se pudo obtener el token de autenticación');
        return;
      }
      this.api.deleteAlbum(id, token).subscribe({
        next: (response) => {
          console.log('Álbum eliminado correctamente', response);
          this.presentToast('middle','Álbum eliminado correctamente','success','checkmark-circle-outline');
          window.location.reload(); 
        },
        error: (error) => {
          console.error('Error al eliminar el álbum', error);
        }
      });
    } catch (error) {
      console.error('Error al obtener el token de autenticación', error);
    }
  }  

  navigateToEditAlbum(albumId: number) {
    this.router.navigate(['/updatealbum', albumId]);
  }

  navigateToSeeSongs(songId: number) {
    this.router.navigate(['/songs/details', songId]);
  }

  user: any[] = [];

  async getUser() {
    const token = await this.storage.get("token");
    this.api.UserbyId(token).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res && res.results) {
          const data = res.results;
          
          this.user.push(...data);
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
