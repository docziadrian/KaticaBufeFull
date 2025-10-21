import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../Services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from '../../../Interfaces/ApiResponse';
import { Forgalom } from '../../../Interfaces/Forgalom';
import { Vevo } from '../../../Interfaces/Vevo';
import { Kategoria } from '../../../Interfaces/Kategoria';
import { Termek } from '../../../Interfaces/Termek';

@Component({
  selector: 'app-forgalom-felvesz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgalom-felvesz.component.html',
  styleUrl: './forgalom-felvesz.component.scss',
})
export class ForgalomFelveszComponent implements OnInit {
  id: number | null = null;
  termekId: number | null = null;
  termekNev: string = '';
  vevoId: number | null = null;
  vevoNev: string = '';
  kategoriaId: number | null = null;
  kategoriaNev: string = '';
  egyseg: string = 'db';
  nettoar: number | null = null;
  mennyiseg: number | null = null;
  kiadva: boolean = false;

  vevoOptions: Vevo[] = [];
  kategoriaOptions: Kategoria[] = [];
  termekOptions: Termek[] = [];

  filteredTermekOptions: Termek[] = [];

  @Output() newForgalom = new EventEmitter<Forgalom>();

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

    this.loadOptions();
  }

  loadOptions(): void {
    this.apiService
      .getAll('http://localhost:3000/vevok')
      .then((data: ApiResponse<Vevo[]>) => {
        this.vevoOptions = data.data || [];
      })
      .catch(() => {});

    this.apiService
      .getAll('http://localhost:3000/kategoria')
      .then((data: ApiResponse<Kategoria[]>) => {
        this.kategoriaOptions = data.data || [];
      })
      .catch(() => {});

    this.apiService
      .getAll('http://localhost:3000/arlista')
      .then((data: ApiResponse<Termek[]>) => {
        this.termekOptions = data.data || [];
      })
      .catch(() => {});
  }

  findTermekId(termekNev: string): number | null {
    const found =
      this.termekOptions.find((t) => t.termekNev === termekNev)?.id || null;
    if (found) return found;
    return null;
  }

  findVevoId(vevoNev: string): number | null {
    const found =
      this.vevoOptions.find((v) => v.vevoNev === vevoNev)?.id || null;
    if (found) return found;
    return null;
  }

  findKategoriaId(kategoriaNev: string): number | null {
    const found =
      this.kategoriaOptions.find((k) => k.kategoriaNev === kategoriaNev)?.id ||
      null;
    if (found) return found;
    return null;
  }

  load(): void {
    this.apiService
      .getOne<Forgalom>('http://localhost:3000/forgalom', this.id!)
      .then((data: ApiResponse<Forgalom>) => {
        if (data.status === 200 && data.data) {
          this.termekId = (data.data as any).termekId;
          this.termekNev = (data.data as any).termekNev;
          this.vevoId = (data.data as any).vevoId;
          this.vevoNev = (data.data as any).vevoNev;
          this.kategoriaId = (data.data as any).kategoriaId;
          this.kategoriaNev = (data.data as any).kategoriaNev;
          this.egyseg = (data.data as any).egyseg;
          this.nettoar = (data.data as any).nettoar;
          this.mennyiseg = (data.data as any).mennyiseg;
          this.kiadva = (data.data as any).kiadva;
        }
      })
      .catch((error: any) => console.error(error));
  }

  onVevoInput(val: string): void {
    const found = this.vevoOptions.find((v) => v.vevoNev === val);
    if (found) this.vevoId = found.id;
  }

  onKategoriaInput(): void {
    console.log('Eddig jó');
    console.log('this.kategoriaId: ', this.kategoriaId);
    this.kategoriaId = this.findKategoriaId(this.kategoriaNev);
    this.filteredTermekOptions = this.termekOptions.filter(
      (t) => t.kategoriaId === this.kategoriaId
    );
    console.log('Filtered Termek Options: ', this.filteredTermekOptions);
  }

  onTermekInput(): void {
    // Find Nettó ár, mennyiség
    this.termekNev = this.termekNev.trim();
    const found = this.termekOptions.find(
      (t) => t.termekNev === this.termekNev
    );
    if (found) {
      this.nettoar = found.nettoar;
      this.mennyiseg = 1;
    }
  }

  save(): void {
    this.termekId = this.findTermekId(this.termekNev);
    this.vevoId = this.findVevoId(this.vevoNev);
    this.kategoriaId = this.findKategoriaId(this.kategoriaNev);
    console.log('termekId: ', this.termekId);
    console.log('vevoId: ', this.vevoId);
    console.log('kategoriaId: ', this.kategoriaId);
    console.log('egyseg: ', this.egyseg);
    console.log('nettoar: ', this.nettoar);
    console.log('mennyiseg: ', this.mennyiseg);
    console.log('kiadva: ', this.kiadva);
    if (
      this.termekId == null ||
      this.vevoId == null ||
      this.nettoar == null ||
      this.mennyiseg == null
    )
      return;

    const payload = {
      termekId: this.termekId,
      vevoId: this.vevoId,
      kategoriaId: this.kategoriaId,
      egyseg: this.egyseg,
      nettoar: this.nettoar,
      mennyiseg: this.mennyiseg,
      kiadva: this.kiadva,
    } as Partial<Forgalom>;

    if (this.id) {
      this.apiService
        .patch<Forgalom>('http://localhost:3000/forgalom', this.id!, payload)
        .then((data: ApiResponse<Forgalom>) => {
          if (data.status === 200) {
            this.newForgalom.emit(data.data);
            this.router.navigate(['/forgalom']);
          }
        })
        .catch((error: any) => console.error(error));
    } else {
      this.apiService
        .post<Forgalom>('http://localhost:3000/forgalom', payload)
        .then((data: ApiResponse<Forgalom>) => {
          if (data.status === 200) {
            this.newForgalom.emit(data.data);
            this.termekId = null;
            this.vevoId = null;
            this.kategoriaId = null;
            this.egyseg = 'db';
            this.nettoar = null;
            this.mennyiseg = null;
            this.kiadva = false;
          }
        })
        .catch((error: any) => console.error(error));
    }
  }
}
