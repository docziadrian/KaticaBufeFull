import { Component } from '@angular/core';
import { ApiService } from '../../../Services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiResponse } from '../../../Interfaces/ApiResponse';
import { Router } from '@angular/router';
import { Forgalom } from '../../../Interfaces/Forgalom';
import { ForgalomFelveszComponent } from '../forgalom-felvesz/forgalom-felvesz.component';

@Component({
  selector: 'app-forgalom-megjelenit',
  standalone: true,
  imports: [CommonModule, FormsModule, ForgalomFelveszComponent],
  templateUrl: './forgalom-megjelenit.component.html',
  styleUrl: './forgalom-megjelenit.component.scss',
})
export class ForgalomMegjelenitComponent {
  forgalmak: Forgalom[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.apiService
      .getAll('http://localhost:3000/forgalom')
      .then((data: ApiResponse<Forgalom[]>) => {
        this.forgalmak = data.data;
      })
      .catch((error: any) => console.error(error));
  }

  delete(id: number): void {
    this.apiService
      .delete('http://localhost:3000/forgalom', id)
      .then((data: ApiResponse<Forgalom>) => {
        if (data.status === 200) {
          this.getAll();
        }
      })
      .catch((error: any) => console.error(error));
  }

  edit(id: number): void {
    this.router.navigate(['/forgalom', id]);
  }
}
