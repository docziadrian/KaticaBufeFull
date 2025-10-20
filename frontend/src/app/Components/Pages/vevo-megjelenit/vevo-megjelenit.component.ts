import { Component } from '@angular/core';
import { ApiService } from '../../../Services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiResponse } from '../../../Interfaces/ApiResponse';
import { Router } from '@angular/router';
import { Vevo } from '../../../Interfaces/Vevo';
import { VevoFelveszComponent } from '../vevo-felvesz/vevo-felvesz.component';

@Component({
  selector: 'app-vevo-megjelenit',
  standalone: true,
  imports: [CommonModule, FormsModule, VevoFelveszComponent],
  templateUrl: './vevo-megjelenit.component.html',
  styleUrl: './vevo-megjelenit.component.scss',
})
export class VevoMegjelenitComponent {
  vevok: Vevo[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.apiService
      .getAll('http://localhost:3000/vevok')
      .then((data: ApiResponse<Vevo[]>) => {
        this.vevok = data.data;
      })
      .catch((error: any) => console.error(error));
  }

  delete(id: number): void {
    this.apiService
      .delete('http://localhost:3000/vevok', id)
      .then((data: ApiResponse<Vevo>) => {
        if (data.status === 200) {
          this.getAll();
        }
      })
      .catch((error: any) => console.error(error));
  }

  edit(id: number): void {
    this.router.navigate(['/vevo', id]);
  }
}
