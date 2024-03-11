import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import { ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { skullOutline, checkmarkCircleOutline, alertCircleOutline, closeCircleOutline } from 'ionicons/icons';
import { Storage } from '@ionic/storage-angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.page.html',
  styleUrls: ['./updateuser.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UpdateuserPage implements OnInit {

  id:string;

  constructor(
    private storage:Storage, 
    private api:ApiService, 
    private toastController:ToastController, 
    private route: ActivatedRoute) { 
      addIcons({skullOutline, checkmarkCircleOutline, alertCircleOutline, closeCircleOutline});
      this.storage.create();
      this.id = route.snapshot.paramMap.get('id') as string;
  }

  async ngOnInit() {
    this.getUser();
    let token = await this.storage.get('token')
    this.api.getUserbyId(token, this.id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.user_name = res.data[0].user_name;
        this.password = res.data[0].password;
        this.email = res.data[0].email;
        this.name = res.data[0].name;
      },
      error:(err:any)=>
      console.log(err)
    })
    console.log("Este es tu id "+this.id)
  }

  user_name="";
  password="";
  email="";
  name="";
  userId: string = "";

  async updateUser() {
    const token = await this.storage.get('token');
  
    if (this.user_name || this.password || this.email || this.name) {
      const userDataToUpdate: any = {};
  
      if (this.user_name) {
        userDataToUpdate.user_name = this.user_name;
      }
      if (this.password) {
        userDataToUpdate.password = this.password;
      }
      if (this.email) {
        userDataToUpdate.email = this.email;
      }
      if (this.name) {
        userDataToUpdate.name = this.name;
      }

      const userId = this.route.snapshot.paramMap.get('id');
  
      if (userId) {
        this.api.updateUser(userId, userDataToUpdate, token).subscribe({
          next: (res: any) => {
            console.log(res);
            if (res.token) {
              this.storage.set('token', res.token);
              this.presentToast('middle', 'Usuario actualizado correctamente', 'success', 'checkmark-circle-outline');
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
        this.presentToast('middle', 'No se pudo obtener el ID del usuario', 'danger', 'alert-circle-outline');
      }
    } else {
      this.presentToast('middle', 'Por favor, completa al menos un campo para actualizar', 'warning', 'alert-circle-outline');
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

  fileToUpload: File | any;

  async setImage(event:any){
    let token = await this.storage.get('token');
    this.fileToUpload = event.target.files[0];
    
    this.route.params.subscribe(params => {
      let albumId = params['id']; 
    
      this.api.uploadFileUser(token, this.fileToUpload, albumId).subscribe({
        next: (res:any) => {
          console.log(res);
          this.presentToast('middle', res.message, 'success', 'checkmark-circle-outline');
        },
        error: (error:any) => {
          console.log(error);
          this.presentToast('middle', "No se subió nada", 'warning', 'close-circle-outline');
        }
      });
    });
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

}
