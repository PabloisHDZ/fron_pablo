import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { addIcons } from 'ionicons';
import { IonicModule } from '@ionic/angular';
import { cloudyOutline, cloudOfflineOutline } from 'ionicons/icons';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

  constructor(
    private storage: Storage,
    private api: ApiService,
    private toastController: ToastController,
    private navCtrl: NavController,
    private router: Router
  ) {
    addIcons({ cloudyOutline, cloudOfflineOutline });
    this.storage.create();
  }

  ngOnInit() { }
  url = environment.urlapi;

  user_name = "";
  password = "";
  login() {
    this.api.login(this.user_name, this.password).subscribe({
      next: (res: any) => {
        console.log(res)
        if (res.token) {
          this.storage.set('token', res.token)
          this.presentToast('middle', 'Bienvenido cargado...', 'success', 'cloudy-outline');
          // Redireccionar al usuario al componente "home" después de iniciar sesión
          this.router.navigateByUrl("/home"); 
        } else {
          this.presentToast('middle', res.message, 'danger', 'cloud-offline-outline');
          setTimeout(()=>{
            this.router.navigateByUrl('/login');
          },
          500
          )
        }
        
      }, error: (error: any) => {
        console.log(error);
        this.presentToast('middle', 'Error intenta mas tarde...', 'danger', 'cloud-offline-outline')
      }
    })
  }

  registrarse() {
    this.navCtrl.navigateForward('/signup');
  }
  
  async presentToast(position: 'top' | 'middle' | 'bottom', msg: string, color: string, icon: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: position,
      color: color,
      mode: 'ios',
      icon: icon
    });

    await toast.present();
  }
}
