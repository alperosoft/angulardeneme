export class topPage {
  id: string;
  name: string;
  icon?: string;
  path?: string;
  disabled?: boolean;
}

export const topPages: topPage[] = [
  {
    id: '1',
    name: 'Anasayfa',
    path: '/home',
  },
  {
    id: '2',
    name: 'Rapor',
    path: '/home/rapor',
  },
  {
    id: '3',
    name: 'Dinamik Rapor',
    path: '/home/dinamik-rapor',
  },
  {
    id: '4',
    name: 'Sipariş Girişi',
    path: '/home/siparis-girisi',
  },
  {
    id: '5',
    name: 'Yetkilendirme',
    path: '/home/yetkilendirme',
  },
  {
    id: '6',
    name: 'Döküm Stok Girişi',
    path: '/home/dokum-stok-girisi',
  },
  {
    id: '7',
    name: 'Alüminyum Rapor',
    path: '/home/aluminyum-rapor',
  },
];

export class Menu {
  id: string;

  text: string;

  expanded?: boolean;

  items?: Menu[];

  price?: number;

  image?: string;
}


