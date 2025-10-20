import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Kategoria } from '../../../Interfaces/Kategoria';
import { ApiResponse } from '../../../Interfaces/ApiResponse';
import { ApiService } from '../../../Services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-kategoria-felvesz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './kategoria-felvesz.component.html',
  styleUrl: './kategoria-felvesz.component.scss',
})
export class KategoriaFelveszComponent implements OnInit {
  kategoriaNev: string = '';
  id: number | null = null;
  @Output() newKategoria = new EventEmitter<Kategoria>();
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = parseInt(params['id']);
      console.log(this.id);
      if (this.id !== null) {
        this.loadKategoria();
      }
    });
  }

  loadKategoria(): void {
    this.apiService
      .getOne<Kategoria>('http://localhost:3000/kategoria', this.id!)
      .then((data: ApiResponse<Kategoria>) => {
        if (data.status === 200) {
          this.kategoriaNev = data.data.kategoriaNev;
          console.log(this.kategoriaNev);
        }
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  addKategoria(): void {
    if (this.kategoriaNev.length === 0) {
      return;
    }

    if (this.id) {
      this.apiService
        .patch<Kategoria>('http://localhost:3000/kategoria', this.id!, {
          kategoriaNev: this.kategoriaNev,
        })
        .then((data: ApiResponse<Kategoria>) => {
          if (data.status === 200) {
            this.newKategoria.emit(data.data);
            this.kategoriaNev = '';
            this.router.navigate(['/kategoria']);
          } else {
            alert('Ilyen kategória már létezik.');
          }
        })
        .catch((error: any) => {
          console.error(error);
        });
    } else {
      this.apiService
        .post<Kategoria>('http://localhost:3000/kategoria', {
          kategoriaNev: this.kategoriaNev,
        })
        .then((data: ApiResponse<Kategoria>) => {
          if (data.status === 200) {
            this.newKategoria.emit(data.data);
            this.kategoriaNev = '';
          } else {
            alert('Ilyen kategória már létezik.');
          }
        })
        .catch((error: any) => {
          console.error(error);
        });
    }
  }
}
