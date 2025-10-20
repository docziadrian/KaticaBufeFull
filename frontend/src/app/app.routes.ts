import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { KategoriaMegjelenitComponent } from './Components/Pages/kategoria-megjelenit/kategoria-megjelenit.component';
import { TermekMegjelenitComponent } from './Components/Pages/termek-megjelenit/termek-megjelenit.component';
import { VevoMegjelenitComponent } from './Components/Pages/vevo-megjelenit/vevo-megjelenit.component';
import { ForgalomMegjelenitComponent } from './Components/Pages/forgalom-megjelenit/forgalom-megjelenit.component';

export const routes: Routes = [
  {
    path: '',
    component: KategoriaMegjelenitComponent,
  },
  {
    path: 'kategoria',
    component: KategoriaMegjelenitComponent,
  },
  {
    path: 'kategoria/:id',
    component: KategoriaMegjelenitComponent,
  },
  {
    path: 'forgalom',
    component: ForgalomMegjelenitComponent,
  },
  {
    path: 'forgalom/:id',
    component: ForgalomMegjelenitComponent,
  },
  {
    path: 'termek/:id',
    component: TermekMegjelenitComponent,
  },
  {
    path: 'termek',
    component: TermekMegjelenitComponent,
  },
  {
    path: 'vevo',
    component: VevoMegjelenitComponent,
  },
  {
    path: 'vevo/:id',
    component: VevoMegjelenitComponent,
  },
];
