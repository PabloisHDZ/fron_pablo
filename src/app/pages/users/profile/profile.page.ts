import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular/standalone';
import { skullOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProfilePage implements OnInit {

  constructor(private api:ApiService, private storage:Storage, private router: Router, private toastController:ToastController) {
    addIcons({skullOutline, checkmarkCircleOutline});
   }

  ngOnInit() {
    this.getUser();
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

  navigateToEditUser(userId: number) {
    this.router.navigate(['/updateuser', userId]);
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
  
}
