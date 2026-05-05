import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BrainTumorService {
  private http = inject(HttpClient);
  public apiUrl = environment.apiUrl; // Exponemos la URL para las imágenes

  clasificarImagen(archivo: File) {
    const formData = new FormData();
    formData.append('image', archivo);
    return this.http.post(`${this.apiUrl}/api/clasificar`, formData);
  }
}