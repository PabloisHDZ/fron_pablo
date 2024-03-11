import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ApiService } from '../../../services/api.service';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { skullOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PerfilPage implements OnInit {

  constructor(private api:ApiService, private storage:Storage, private toastController:ToastController, private router: Router, private act:ActivatedRoute) {
    addIcons({skullOutline, checkmarkCircleOutline});
  }

  ngOnInit() {
    this.getUser();
  }

  user: any[] = [];

  async getUser() {
    const token = await this.storage.get("token");
    this.api.getUsers(token).subscribe({
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

  async deleteUser(id: string) {
    try {
      const token = await this.storage.get('token');
    
      if (!token) {
        console.error('No se pudo obtener el token de autenticación');
        return;
      }
      this.api.deleteUser(id, token).subscribe({
        next: (response) => {
          console.log('Usuario eliminado correctamente', response);
          this.presentToast('middle','Usuario eliminado correctamente','success','checkmark-circle-outline');
          window.location.reload(); 
        },
        error: (error) => {
          console.error('Error al eliminar el usuario', error);
        }
      });
    } catch (error) {
      console.error('Error al obtener el token de autenticación', error);
    }
  }

  navigateToEditUser(songId: number) {
    this.router.navigate(['/updateuser', songId]);
  }

  navigateToPostUser() {
    this.router.navigate(['/postuser']);
  }

}
