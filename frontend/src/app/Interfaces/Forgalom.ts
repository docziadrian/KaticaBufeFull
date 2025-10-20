export interface Forgalom {
  id: number;
  termekId: number;
  vevoId: number;
  kategoriaId: number | null;
  egyseg: string;
  nettoar: number;
  mennyiseg: number;
  kiadva: boolean;
  termekNev?: string;
  vevoNev?: string;
  kategoriaNev?: string | null;
}
