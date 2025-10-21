import { Component, OnInit } from '@angular/core';
import { Kategoria } from '../../../Interfaces/Kategoria';
import { Termek } from '../../../Interfaces/Termek';
import { ApiService } from '../../../Services/api.service';
import { ApiResponse } from '../../../Interfaces/ApiResponse';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ar-lista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ar-lista.component.html',
  styleUrl: './ar-lista.component.scss',
})
export class ArListaComponent implements OnInit {
  kategoriak: Kategoria[] = [];
  termekek: Termek[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.getAllKategoriak();
    this.getAllTermek();
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

  getAllTermek(): void {
    this.apiService
      .getAll('http://localhost:3000/arlista')
      .then((data: ApiResponse<Termek[]>) => {
        this.termekek = data.data;
      })
      .catch((error: any) => {
        console.error(error);
      });
  }
}
