import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrainTumorService } from './brain-tumor.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  private brainService = inject(BrainTumorService);
  
  apiUrl = this.brainService.apiUrl;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  resultado: any = null;
  loading: boolean = false;
  v: number = Date.now(); // Token para refrescar la gráfica

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.resultado = null;
      const reader = new FileReader();
      reader.onload = () => this.imagePreview = reader.result;
      reader.readAsDataURL(file);
    }
  }

  ejecutarClasificacion() {
    if (!this.selectedFile) return;

    this.loading = true;
    this.brainService.clasificarImagen(this.selectedFile).subscribe({
      next: (res) => {
        this.resultado = res;
        this.v = Date.now(); 
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        alert('Error en el servidor');
      }
    });
  }
}