interface Select {
  value: string | number;
  viewValue: string;
}

interface Tab {
  id: number;
  text?: string;
  icon?: string;
}

export const Durum: Select[] = [
  { value: 0, viewValue: 'Aktif' },
  { value: 1, viewValue: 'Pasif' },
];

export const Sevkiyat: Select[] = [
  { value: 0, viewValue: 'Evet' },
  { value: 1, viewValue: 'Hayır' },
];

export const CalismaKuru: Select[] = [
  { value: 'DA', viewValue: 'Döviz Alış' },
  { value: 'DS', viewValue: 'Döviz Satış' },
  { value: 'EA', viewValue: 'Efektif Alış' },
  { value: 'ES', viewValue: 'Efektif Satış' },
];

export const OdemeTipi: Select[] = [
  { value: 0, viewValue: 'Peşin' },
  { value: 30, viewValue: '30 Gün' },
  { value: 40, viewValue: '40 Gün' },
  { value: 60, viewValue: '60 Gün' },
  { value: 80, viewValue: '80 Gün' },
  { value: 90, viewValue: '90 Gün' },
  { value: 110, viewValue: '110 Gün' },
  { value: 120, viewValue: '120 Gün' },
  { value: 150, viewValue: '150 Gün' },
  { value: 180, viewValue: '180 Gün' },
];

export const SiparisOnay: Select[] = [
  { value: 1, viewValue: 'Evet' },
  { value: 0, viewValue: 'Hayır' },
];

export const NakliyeBedeli: Select[] = [
  { value: 0, viewValue: 'Bize Ait' },
  { value: 1, viewValue: 'Müşteriye Ait' },
];

export const RiskLimitiAsildiginda: Select[] = [
  { value: 1, viewValue: 'İşleme Edilecek' },
  { value: 2, viewValue: 'İşlem Durdurulacak' },
  { value: 0, viewValue: 'İşlem Hatası' },
];

export const FirmaKategori: Select[] = [
  { value: 'SAT', viewValue: 'Tedarikçi' },
  { value: 'MUS', viewValue: 'Müşteri' },
  { value: 'ORG', viewValue: 'Örgücü' },
  { value: 'BOY', viewValue: 'Boyacı' },
  { value: 'OBY', viewValue: 'Örmeci-Boyacı' },
  { value: 'BAS', viewValue: 'Baskıcı' },
  { value: 'IBY', viewValue: 'İklik BOyacı' },
  { value: 'ACN', viewValue: 'Acenta' },
  { value: 'DGR', viewValue: 'Diğer' },
  { value: 'SVK', viewValue: 'Sevki Yeri' },
  { value: 'DCK', viewValue: 'Dokumacı' },
  { value: 'COZ', viewValue: 'Çözgücü' },
  { value: 'DIK', viewValue: 'Dikim' },
  { value: 'KES', viewValue: 'Kesim' },
  { value: 'DKS', viewValue: 'Dikim-Kesim' },
];

export const StokluCalisma: Select[] = [
  { value: 0, viewValue: 'Yok' },
  { value: 1, viewValue: 'Var' },
];

export const Cektest: Select[] = [
  { value: 'A', viewValue: 'Asarak' },
  { value: 'A30', viewValue: 'Asarak - 30' },
  { value: 'S', viewValue: 'Sererek' },
  { value: 'T', viewValue: 'Thumpler' },
];

export const tabsWithText: Tab[] = [
  {
    id: 0,
    text: 'İletişim',
  },
  {
    id: 1,
    text: 'Ticari Bilgiler',
  },
  {
    id: 2,
    text: 'Diğer Bilgiler',
  },
  {
    id: 3,
    text: 'Muhasebe',
  },
  {
    id: 4,
    text: 'Sevk Adresleri',
  },
  {
    id: 5,
    text: 'Firma Arşiv',
  },
  {
    id: 6,
    text: 'Gümrük Bilgileri',
  },
  {
    id: 7,
    text: 'Firma Temsilci Bilgileri',
  },
  {
    id: 8,
    text: 'Mail Bilgileri',
  },
  {
    id: 9,
    text: 'Muhasebe Detay',
  },
];

export const personel: Select[] = [];
export const bakilacakIsTuru: Select[] = [];
export const firmaGrubu2: Select[] = [];