import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService} from '../../../services/api.service';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {checkmarkCircle,closeCircleOutline,close,} from 'ionicons/icons';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DetailsPage implements OnInit {

  albums:any[]=[];

  id:string;

  constructor(
    private act:ActivatedRoute, 
    private api:ApiService, 
    private storage:Storage, 
    private toastController: ToastController,
    private router:Router) {
    addIcons({checkmarkCircle,closeCircleOutline,close});
    this.id = act.snapshot.paramMap.get('id') as string;
   }

  ngOnInit() {
    this.getAlbumsbyArtist();
    this.getUser();
  }
  url = environment.urlapi;
  async getAlbumsbyArtist(){
    this.api.getAlbumsbyArtist(this.id).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.albums=res.data;
      }, error:(error:any)=>{
        console.log(error)
        // this.presentToast('middle','Intenta iniciando sesión nuevamente','waring','close-circle-outline')
      }
    })

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

  async presentToast(position: 'top' | 'middle' | 'bottom', msg:string, color:string, icon:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: position,
      color: color,
      mode: 'ios',
      icon: icon
    });

    await toast.present();
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

