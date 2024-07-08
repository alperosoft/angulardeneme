interface Select {
  value: string;
  viewValue: string;
}

export const displayedColumns: string[] = [
  'spd_sira',
  'spd_urtt_id',
  // 'spd_kod1',
  'spd_mm_kod',
  'spd_kartela',
  'spd_partino',
  'compute_mm_ad', // IF
  'spd_tlmt_kod',
  'spd_yuzey',
  'spd_cektest',
  'spd_cl_primno',
  'spd_des_id2',
  'spd_kg_top',
  'spd_paket_mkt',
  'spd_ormkt_mt',
  'compute_kalan_stok', // IF
  'spd_mmetretul', //birim
  'spd_amb_mkt',
  'spd_mkt',
  'spd_birim',
  'spd_ormkt_kg',
  'compute_stok',
  'spd_hmetretul', //çevre
  'spd_donmezlik',
  'spd_fire',
  'spd_tolerans_pozitif',
  'spd_tolerans_negatif',
  'spd_as_iz',
  'spd_as_oriz',
  'spd_des_primno',
  'spd_kod2',
  'spd_amb_kod',
  'spd_eb_kod',
  'spd_frm_sipno',
  'spd_bitis', //checkbox
  'spd_onay', //checkbox
  'spd_fayn', //checkbox
  'spd_tertrh',
  'spd_tertrh2',
  'spd_masraf_tutar',
  'spd_tolerans',
  'spd_dvz_kod',
  'spd_fiyat',
  'spd_hspbirim',
  'spd_fyt_id',
  'spd_spg_primno', //sipariş grubu
  'compute_sp_drm', // IF
  'spd_referans',
  'spd_lotno',
  'spd_aciklama',
  'spd_sevk_aciklama',
  'spd_yuzey_islem',
  'spd_yuzey_kalinlik',
  'compute_kalip_drm', // IF
  'spd_asp_no1',
  'spd_asp_no2',
  'spd_aspd_sira',
  'spd_i2',
  'spd_ormkt_top',
];

export const displayedTitles: string[] = [
  'Sıra',
  'Sistem',
  'Teklif Id',
  'Kod',
  'Stok Parti No',
  'Profil No',
  'Adı',
  'Ürün Tipi',
  'Yüzey',
  'Mat Parlak',
  'Renk',
  'Kaplama Kodu',
  'Paket İçi Miktari',
  'Paket Miktarı',
  'Birim Boy Inch/ft',
  'Birim',
  'Birim Boy(mt)',
  'Boy Adedi',
  'Miktar',
  'Birim',
  'Miktar (lb)',
  'Kalan Stok',
  'Çevre (mm)',
  'Tolerans (-mm)',
  'Tolerans (%)',
  'Tolerans (+)',
  'Tolerans (-)',
  'Askı İzi',
  'Askı Orta izi',
  'Yalıtım Fitil Kodu',
  'Koruma Bandı',
  'Paket Türü',
  'Alaşım',
  'Termik',
  'Bitiş',
  'Devam Onayı',
  'Pres Üretim',
  'Termin Tarihi',
  'Termin Tarihi 2',
  'Satınalma Limiti TL',
  'LME',
  'Döviz Birimi',
  'Fiyat',
  'Hesap Birimi',
  'Fiyatlandırma Türü',
  'Sipariş Grubu',
  'Sipariş Durumu',
  'Üretim Yeri',
  'Detay Referans',
  'Açıklama',
  'Sevkiyat Açıklama',
  'Yüzey İşlem',
  'Yüzey Kalınlığı',
  'Kalıp Durum',
  'Ent.Sipariş Yıl',
  'Ent.Sipariş No',
  'Ent.Sipariş Sıra',
  'Termin Gecikme Nedeni',
  'Minimum Stok Boy Adedi',
];


export const spd_yuzey: Select[] = [
  { value: '', viewValue: '' },
  { value: 'M', viewValue: 'Mat' },
  { value: 'P', viewValue: 'Parlak' },
  { value: 'U', viewValue: 'Pütürlü' },
  { value: 'N', viewValue: 'Numune' },
  { value: 'A', viewValue: 'Az Parlak' },
  { value: 'Y', viewValue: 'Yarı Parlak' },
  { value: 'C', viewValue: 'Çok Parlak' },
  { value: 'S', viewValue: 'Saten' },
];

export const spd_cektest: Select[] = [
  { value: '', viewValue: '' },
  { value: 'M', viewValue: 'Mat' },
  { value: 'P', viewValue: 'Parlak' },
];

export const spd_amb_partino: Select[] = [
  { value: '', viewValue: '' },
  { value: 'inch', viewValue: 'Inch' },
  { value: 'ft', viewValue: 'Food' },
];

export const spd_as_iz: Select[] = [
  { value: '', viewValue: '' },
  { value: '0', viewValue: 'Var' },
  { value: '1', viewValue: 'Yok' },
];

export const spd_as_oriz: Select[] = [
  { value: '', viewValue: '' },
  { value: '0', viewValue: 'Var' },
  { value: '1', viewValue: 'Yok' },
];

export const spd_frm_sipno: Select[] = [
  { value: '', viewValue: '' },
  { value: '', viewValue: 'Termiksiz' },
  { value: 'T1', viewValue: 'T1' },
  { value: 'T2', viewValue: 'T2' },
  { value: 'T3', viewValue: 'T3' },
  { value: 'T4', viewValue: 'T4' },
  { value: 'T5', viewValue: 'T5' },
  { value: 'T6', viewValue: 'T6' },
  { value: 'T7', viewValue: 'T7' },
  { value: 'T8', viewValue: 'T8' },
  { value: 'T9', viewValue: 'T9' },
  { value: 'T10', viewValue: 'T10' },
  { value: 'T11', viewValue: 'T11' },
  { value: 'T12', viewValue: 'T12' },
  { value: 'T61', viewValue: 'T61' },
  { value: 'T66', viewValue: 'T66' },
  { value: 'T64', viewValue: 'T64' },
  { value: 'TRM', viewValue: 'Termikli' },
  { value: 'TOZEL', viewValue: 'Özel Termik' },
  { value: '1GUN', viewValue: '1 gün atlatarak Termik' },
];

export const spd_tolerans: Select[] = [
  { value: '0', viewValue: '' },
  { value: '1', viewValue: 'LME Dahil Fiyat' },
  { value: '2', viewValue: 'LME Güncel+Fiyat' },
  { value: '3', viewValue: 'LME Sabit+Fiyat' },
];

export const spd_yuzey_islem: Select[] = [
  { value: '', viewValue: '' },
  { value: 'EL', viewValue: 'Standart' },
  { value: 'EL1', viewValue: 'Satine' },
  { value: 'EL2', viewValue: 'Tel Fırça' },
  { value: 'K1', viewValue: 'Klas 1' },
  { value: 'K2', viewValue: 'Klas 2' },
  { value: 'K3', viewValue: 'Klas 3' },
];

export const spd_yuzey_kalinlik: Select[] = [
  { value: '0,000', viewValue: '' },
  { value: '6,000', viewValue: '6-8 Mikron Eloksal' },
  { value: '8,000', viewValue: '8-10 Mikron Eloksal' },
  { value: '10,000', viewValue: '10-12 Mikron Eloksal' },
  { value: '12,000', viewValue: '12-14 Mikron Eloksal' },
  { value: '20,000', viewValue: '20 Mikron Eloksal' },
  { value: '30,000', viewValue: '30 Mikron Eloksal' },
  { value: '15,000', viewValue: '12-15 Mikron Eloksal' },
  { value: '17,000', viewValue: '15-20 Mikron Eloksal' },
  { value: '18,000', viewValue: '18-20 Mikron Eloksal' },
  { value: '19,0000', viewValue: '15 mikron Eloksal' },
];

export const spd_i2: Select[] = [
  { value: '0', viewValue: '' },
  { value: '1', viewValue: 'Sipariş Yoğunluğundan' },
  { value: '2', viewValue: 'Pres Makina Yoğunluğundan' },
  { value: '3', viewValue: 'Boyahane Yoğunluğundan' },
  { value: '4', viewValue: 'Eloksal Yoğunluğundan' },
  { value: '5', viewValue: 'Talaşlı İmalat Yoğunluğundan' },
  { value: '6', viewValue: 'Gerekli Malzeme Tedarik Eksikliğinden' },
  { value: '7', viewValue: 'Tatil Sebebiyle' },
  { value: '8', viewValue: 'Ham Madde Eksikliğinden' },
];

export const urunTipi: Select[] = [];

export const colors: Select[] = [];

export const korumaBandi: Select[] = [];

export const paketTuru: Select[] = [];

export const alasim: Select[] = [];

export const doviz: Select[] = [];

export const hesapBirimi: Select[] = [];

export const fiyat: Select[] = [];

export const siparisGrubu: Select[] = [];

export const uretimYeri: Select[] = [];

export const yalitimFitilKodu: Select[] = [];
