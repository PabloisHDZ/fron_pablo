import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Storage } from '@ionic/storage-angular';
import { empty } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url = environment.urlapi;

  constructor(private http:HttpClient, private storage:Storage) { 
    this.storage.create()
  }

  login(user_name:string, password:string){
    return this.http.post(this.url+'/login',{"user_name":user_name,"password":password,"token":true});
  }

  signup(name:string, user_name:string, password:string, email:string){
    return this.http.post(this.url+'/users',{"name":name,"user_name":user_name,"password":password,
      "email":email});
  }

  postArtists(name:string, description:string, token:string){
    return this.http.post(this.url+'/artists',{"name":name,"description":description},{headers:{"Authorization":token}});
  }

  postAlbum(title:string, description:string, year:string, artist_id:string, token:string){
    return this.http.post(this.url+'/albums',{"title":title,"description":description,"year":year,"artist_id":artist_id},{headers:{"Authorization":token}});
  }

  postSong(name:string, number:string, duration:string, album_id:string, token:string){
    return this.http.post(this.url+'/songs',{"name":name,"number":number,"duration":duration,"album_id":album_id},{headers:{"Authorization":token}});
  }

  updateArtist(id: string, data: any, token: string) {
    return this.http.put(this.url + '/artists/' + id, data, { headers: { "Authorization": token }});
  }

  updateAlbum(id: string, data: any, token: string) {
    return this.http.put(this.url + '/albums/' + id, data, { headers: { "Authorization": token }});
  }

  updateSong(id: string, data: any, token: string) {
    return this.http.put(this.url + '/songs/' + id, data, { headers: { "Authorization": token }});
  }

  updateUser(id: string, data: any, token: string) {
    return this.http.put(this.url + '/users/' + id, data, { headers: { "Authorization": token }});
  }

  deleteArtist(id: string, token: string) {
    return this.http.delete(this.url + '/artists/' + id, { headers: { "Authorization": token }});
  }

  deleteAlbum(id: string, token: string) {
    return this.http.delete(this.url + '/albums/' + id, { headers: { "Authorization": token }});
  }

  deleteSong(id: string, token: string) {
    return this.http.delete(this.url + '/songs/' + id, { headers: { "Authorization": token }});
  }

  deleteUser(id: string, token: string) {
    return this.http.delete(this.url + '/users/' + id, { headers: { "Authorization": token }});
  }
  
  getUsers(token:string){
    return this.http.get(this.url + '/users', {headers:{"Authorization":token}})
  }

  getUserbyId(token:string, id:any){
    return this.http.get(this.url+"/users/"+id,{ headers: {'Authorization': token}})
  }

  UserbyId(token:string){
    return this.http.get(this.url+"/user", { headers: {'Authorization': token}})
  }

  getArtists(token:string){
    return this.http.get(this.url + '/artists', {headers:{"Authorization":token}})
  }

  getArtistsbyId(token:string, id:any){
    return this.http.get(this.url+"/artists/"+id,{ headers: {'Authorization': token}})
  }

  getAlbums(token:string){
    return this.http.get(this.url + '/albums', {headers:{"Authorization":token}})
  }

  getAlbumsbyId(token:string, id:any){
    return this.http.get(this.url+"/albums/"+id,{ headers: {'Authorization': token}})
  }

  getAlbumsbyArtist(id:any){
    return this.http.get(this.url+"/albums/details/"+id)
  }

  getSongs(token:string){
    return this.http.get(this.url + '/songs', {headers:{"Authorization":token}})
  }

  getSongbyId(token:string, id:any){
    return this.http.get(this.url+"/songs/"+id,{ headers: {'Authorization': token}})
  }

  getSongsbyAlbums(id:any){
    return this.http.get(this.url+"/songs/details/"+id)
  }

  uploadFile(token:string, file:File, id:any){
    if (file) {
      const formData = new FormData();
      formData.append('image', file, file.name);
      return this.http.post(this.url+'/artists/'+id, formData, {headers:{"Authorization":token}});
    }else{
      //Devuelve un observable vacío si no hay un archivo
      return empty();
    }
  }

  uploadFileAlbum(token:string, file:File, id:any){
    if (file) {
      const formData = new FormData();
      formData.append('image', file, file.name);
      return this.http.post(this.url+'/albums/'+id, formData, {headers:{"Authorization":token}});
    }else{
      return empty();
    }
  }

  uploadFileSong(token:string, file:File, id:any){
    if (file) {
      const formData = new FormData();
      formData.append('file', file, file.name);
      return this.http.post(this.url+'/songs/'+id, formData, {headers:{"Authorization":token}});
    }else{
      return empty();
    }
  }

  uploadFileUser(token:string, file:File, id:any){
    if (file) {
      const formData = new FormData();
      formData.append('image', file, file.name);
      return this.http.post(this.url+'/users/'+id, formData, {headers:{"Authorization":token}});
    }else{
      return empty();
    }
  }

  getArtistsById(id:any, token:string){
    return this.http.get(this.url + '/artists/' + id, {headers:{"Authorization":token}})
  }

}
