interface Select {
  value: string | number;
  viewValue: string;
}

interface User {
  value: number;
  viewValue: string;
}

export const ihracatTipi: Select[] = [
  { value: '', viewValue: '' },
  { value: 'FOB', viewValue: 'FOB' },
  { value: 'CIF', viewValue: 'CIF' },
  { value: 'CFR', viewValue: 'CFR' },
  { value: 'EXW', viewValue: 'EXW' },
  { value: 'FCA', viewValue: 'FCA' },
  { value: 'FAS', viewValue: 'FAS' },
  { value: 'DAP', viewValue: 'DAP' },
  { value: 'DDP', viewValue: 'DDP' },
  { value: 'CAD', viewValue: 'CAD' },
  { value: 'CPT', viewValue: 'CPT' },
  { value: 'DAT', viewValue: 'DAT' },
  { value: 'EXP', viewValue: 'EXP' },
  { value: 'EXWORK', viewValue: 'EXWORK' },
  { value: 'CNF', viewValue: 'CNF' },
  { value: 'CIP', viewValue: 'CIP' },
  { value: '', viewValue: '' },
];

export const calismaTuru: Select[] = [
  { value: 'S', viewValue: 'Satış' },
  { value: 'F', viewValue: 'Fason' },
  { value: '', viewValue: '' },
];

export const siparisDurumu: Select[] = [
  { value: '', viewValue: 'Giriş Sürecinde' },
  { value: '1', viewValue: 'Tamamlandı' },
  { value: '', viewValue: '' },
];

export const odemePlani: Select[] = [];
export const spkateg: Select[] = [];
export const etiket: Select[] = [];
export const sevkAdresi: Select[] = [];
export const proje: Select[] = [];
export const personel: User[] = [];
