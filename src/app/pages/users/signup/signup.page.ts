import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { ToastController } from '@ionic/angular';

import { addIcons } from 'ionicons';
import { skullOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { Storage } from '@ionic/storage-angular'; 

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SignupPage implements OnInit {

  constructor(private storage:Storage, private api:ApiService, private toastController:ToastController) { 
    addIcons({skullOutline, checkmarkCircleOutline});
    this.storage.create();
  }

  ngOnInit() {
  }

  name="";
  user_name="";
  password="";
  email="";
  
  signup() {
    if (this.name && this.user_name && this.password && this.email) {
      this.api.signup(this.name, this.user_name, this.password, this.email).subscribe({
        next: (res: any) => {
          console.log(res);
          if (res && !res.error) { 
            this.presentToast('middle', res.message, 'success', 'checkmark-circle-outline');
          } else {
            this.presentToast('middle', 'Error al registrar, intenta más tarde', 'danger', 'skull-outline');
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
}
