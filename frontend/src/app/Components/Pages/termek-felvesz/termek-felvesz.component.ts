import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../Services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Termek } from '../../../Interfaces/Termek';
import { ApiResponse } from '../../../Interfaces/ApiResponse';
import { Kategoria } from '../../../Interfaces/Kategoria';

@Component({
  selector: 'app-termek-felvesz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './termek-felvesz.component.html',
  styleUrl: './termek-felvesz.component.scss',
})
export class TermekFelveszComponent implements OnInit {
  id: number | null = null;
  termekNev: string = '';
  kategoriaId: number | null = null;
  kategoriaNev: string = '';
  egyseg: string = 'db';
  nettoar: number | null = null;
  mennyiseg: number = 0;

  kategoriaOptions: Kategoria[] = [];

  @Output() newTermek = new EventEmitter<Termek>();

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = parseInt(params['id']);
      if (!isNaN(this.id)) {
        this.loadTermek();
      } else {
        this.id = null;
      }
    });

    this.loadOptions();
  }

  loadOptions(): void {
    this.apiService
      .getAll('http://localhost:3000/kategoria')
      .then((data: ApiResponse<Kategoria[]>) => {
        this.kategoriaOptions = data.data || [];
      })
      .catch(() => {});
  }

  onKategoriaInput(val: string): void {
    const found = this.kategoriaOptions.find((k) => k.kategoriaNev === val);
    this.kategoriaId = found ? found.id : null;
  }

  loadTermek(): void {
    this.apiService
      .getOne<Termek>('http://localhost:3000/arlista', this.id!)
      .then((data: ApiResponse<Termek>) => {
        if (data.status === 200 && data.data) {
          this.termekNev = (data.data as any).termekNev;
          this.kategoriaId = (data.data as any).kategoriaId;
          this.kategoriaNev = (data.data as any).kategoriaNev;
          this.egyseg = (data.data as any).egyseg;
          this.nettoar = (data.data as any).nettoar;
          this.mennyiseg = (data.data as any).mennyiseg;
        }
      })
      .catch((error: any) => console.error(error));
  }

  findKategoriaId(kategoriaNev: string): number | null {
    const found =
      this.kategoriaOptions.find((k) => k.kategoriaNev === kategoriaNev)?.id ||
      null;
    if (found) return found;
    return null;
  }

  save(): void {
    this.kategoriaId = this.findKategoriaId(this.kategoriaNev);
    console.log('kategoriaId: ', this.kategoriaId);
    console.log('termekNev: ', this.termekNev);
    console.log('nettoar: ', this.nettoar);
    console.log('mennyiseg: ', this.mennyiseg);
    console.log('egyseg: ', this.egyseg);

    if (!this.termekNev || this.kategoriaId == null || this.nettoar == null) {
      return;
    }

    const payload = {
      termekNev: this.termekNev,
      kategoriaId: this.kategoriaId,
      egyseg: this.egyseg,
      nettoar: this.nettoar,
      mennyiseg: this.mennyiseg,
    } as Partial<Termek>;

    if (this.id) {
      this.apiService
        .patch<Termek>('http://localhost:3000/arlista', this.id!, payload)
        .then((data: ApiResponse<Termek>) => {
          if (data.status === 200) {
            this.newTermek.emit(data.data);
            this.router.navigate(['/termek']);
          }
        })
        .catch((error: any) => console.error(error));
    } else {
      this.apiService
        .post<Termek>('http://localhost:3000/arlista', payload)
        .then((data: ApiResponse<Termek>) => {
          if (data.status === 200) {
            this.newTermek.emit(data.data);
            this.termekNev = '';
            this.kategoriaId = null;
            this.egyseg = 'db';
            this.nettoar = null;
            this.mennyiseg = 0;
          }
        })
        .catch((error: any) => console.error(error));
    }
  }
}
