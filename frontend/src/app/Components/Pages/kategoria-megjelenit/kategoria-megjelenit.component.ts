import { Component, SimpleChanges } from '@angular/core';
import { ApiService } from '../../../Services/api.service';
import { Kategoria } from '../../../Interfaces/Kategoria';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiResponse } from '../../../Interfaces/ApiResponse';
import { KategoriaFelveszComponent } from '../kategoria-felvesz/kategoria-felvesz.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-kategoria-megjelenit',
  standalone: true,
  imports: [CommonModule, FormsModule, KategoriaFelveszComponent],
  templateUrl: './kategoria-megjelenit.component.html',
  styleUrl: './kategoria-megjelenit.component.scss',
})
export class KategoriaMegjelenitComponent {
  kategoriak: Kategoria[] = [];
  kategoriaNev: string = '';
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.getAllKategoriak();
  }

  getAllKategoriak(): void {
    this.apiService
      .getAll('http://localhost:3000/kategoria')
      .then((data: ApiResponse<Kategoria[]>) => {
        this.kategoriak = data.data;
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  deleteKategoria(id: number): void {
    this.apiService
      .delete('http://localhost:3000/kategoria', id)
      .then((data: ApiResponse<Kategoria>) => {
        if (data.status === 200) {
          this.getAllKategoriak();
        }
      })
      .catch();
  }

  editKategoria(id: number): void {
    this.router.navigate(['/kategoria', id]);
  }
}
