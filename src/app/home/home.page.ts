import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ApiService } from '../services/api.service';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { addIcons } from 'ionicons';
import { skullOutline, checkmarkCircleOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomePage implements OnInit {
  constructor(private api:ApiService, private storage:Storage, private toastController:ToastController, 
    private router: Router, private act:ActivatedRoute) {
    addIcons({skullOutline, checkmarkCircleOutline});
  }

  ngOnInit() {
    this.getUser()
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

  navigateToPostArtist() { this.router.navigate(['/postartist']); }

  navigateToPostAlbum() { this.router.navigate(['/postalbum']); }

  navigateToPostSong() { this.router.navigate(['/postsong']); }

  navigateToHomeArtist() { this.router.navigate(['/homeartist']); }

  navigateToHomeAlbum() { this.router.navigate(['/homealbum']); }

  navigateToHomeSong() { this.router.navigate(['/homesong']); }

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
  async logout() {
    await this.storage.remove('token');
    this.router.navigateByUrl('/login');
  };

  navigateToProfile() { this.router.navigate(['/profile']); }

  navigateToProfiles() { this.router.navigate(['/perfiles']); }

}
