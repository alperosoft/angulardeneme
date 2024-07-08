import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  {
    state: 'home',
    name: 'Rapor 1',
    type: 'link',
    icon: 'av_timer',
  },
  {
    state: 'rapor2',
    name: 'Rapor 2',
    type: 'link',
    icon: 'av_timer',
  },
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
