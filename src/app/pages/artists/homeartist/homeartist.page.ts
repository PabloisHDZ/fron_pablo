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
  selector: 'app-homeartist',
  templateUrl: './homeartist.page.html',
  styleUrls: ['./homeartist.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeartistPage implements OnInit {

  constructor(private api:ApiService, private storage:Storage, private toastController:ToastController, private router: Router, private act:ActivatedRoute) {
    addIcons({skullOutline, checkmarkCircleOutline});
  }

  ngOnInit() {
    this.getArtists();
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

  navigateToEditArtist(artistId: number) {
    this.router.navigate(['/updateartist', artistId]);
  }

  navigateToSeeAlbums(artistId: number) {
    this.router.navigate(['/albums/details', artistId])
  }

  async deleteArtist(id: string) {
    try {
      const token = await this.storage.get('token');
    
      if (!token) {
        console.error('No se pudo obtener el token de autenticación');
        return;
      }
      this.api.deleteArtist(id, token).subscribe({
        next: (response) => {
          console.log('Artista eliminado correctamente', response);
          this.presentToast('middle','Artista eliminado correctamente','success','checkmark-circle-outline');
          window.location.reload(); 
        },
        error: (error) => {
          console.error('Error al eliminar el artista', error);
        }
      });
    } catch (error) {
      console.error('Error al obtener el token de autenticación', error);
    }
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
