import { Component } from '@angular/core';
import { ApiService } from '../../../Services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiResponse } from '../../../Interfaces/ApiResponse';
import { Router } from '@angular/router';
import { Termek } from '../../../Interfaces/Termek';
import { TermekFelveszComponent } from '../termek-felvesz/termek-felvesz.component';

@Component({
  selector: 'app-termek-megjelenit',
  standalone: true,
  imports: [CommonModule, FormsModule, TermekFelveszComponent],
  templateUrl: './termek-megjelenit.component.html',
  styleUrl: './termek-megjelenit.component.scss',
})
export class TermekMegjelenitComponent {
  termekek: Termek[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.apiService
      .getAll('http://localhost:3000/arlista')
      .then((data: ApiResponse<Termek[]>) => {
        this.termekek = data.data;
      })
      .catch((error: any) => console.error(error));
  }

  delete(id: number): void {
    this.apiService
      .delete('http://localhost:3000/arlista', id)
      .then((data: ApiResponse<Termek>) => {
        if (data.status === 200) {
          this.getAll();
        }
      })
      .catch((error: any) => console.error(error));
  }

  edit(id: number): void {
    this.router.navigate(['/termek', id]);
  }
}
