interface Select {
  value: string | number;
  viewValue: string;
}

export const urunTipiOptions: Select[] = [
  { value: 'PR', viewValue: 'Pres' },
  { value: 'BY', viewValue: 'Boya' },
  { value: 'EL', viewValue: 'Eloksal' },
  { value: 'T', viewValue: 'Tümü' },
];

export const durumuOptions: Select[] = [
  { value: 'A', viewValue: 'Devam Edenler' },
  { value: 'K', viewValue: 'Bitenler' },
  { value: 'T', viewValue: 'Tümü' },
  { value: '', viewValue: '' },
];
