import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../Services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from '../../../Interfaces/ApiResponse';
import { Vevo } from '../../../Interfaces/Vevo';

@Component({
  selector: 'app-vevo-felvesz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vevo-felvesz.component.html',
  styleUrl: './vevo-felvesz.component.scss',
})
export class VevoFelveszComponent implements OnInit {
  id: number | null = null;
  vevoNev: string = '';

  @Output() newVevo = new EventEmitter<Vevo>();

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = parseInt(params['id']);
      if (!isNaN(this.id)) {
        this.load();
      } else {
        this.id = null;
      }
    });
  }

  load(): void {
    this.apiService
      .getOne<Vevo>('http://localhost:3000/vevok', this.id!)
      .then((data: ApiResponse<Vevo>) => {
        if (data.status === 200 && data.data) {
          this.vevoNev = (data.data as any).vevoNev;
        }
      })
      .catch((error: any) => console.error(error));
  }

  save(): void {
    if (!this.vevoNev) return;

    const payload = { vevoNev: this.vevoNev } as Partial<Vevo>;

    if (this.id) {
      this.apiService
        .patch<Vevo>('http://localhost:3000/vevok', this.id!, payload)
        .then((data: ApiResponse<Vevo>) => {
          if (data.status === 200) {
            this.newVevo.emit(data.data);
            this.router.navigate(['/vevo']);
          }
        })
        .catch((error: any) => console.error(error));
    } else {
      this.apiService
        .post<Vevo>('http://localhost:3000/vevok', payload)
        .then((data: ApiResponse<Vevo>) => {
          if (data.status === 200) {
            this.newVevo.emit(data.data);
            this.vevoNev = '';
          }
        })
        .catch((error: any) => console.error(error));
    }
  }
}
