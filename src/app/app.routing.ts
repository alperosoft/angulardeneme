import {Routes} from '@angular/router';

import {FullComponent} from './layouts/full/full.component';
import {LoginComponent} from './pages/login/login.component';
import {AnaSayfaComponent} from './pages/anasayfa/anasayfa.component';
import {RaporChartComponent} from './pages/rapor/rapor.component';
import {DinamikRaporComponent} from "./pages/dinamik-rapor/dinamik-rapor.component";
import {SiparisGirisiComponent} from "./pages/siparis-girisi/siparis-girisi.component";
import {DokumStokGirisiComponent} from "./pages/dokum-stok-girisi/dokum-stok-girisi.component";
import {YetkilendirmeComponent} from "./pages/yetkilendirme/yetkilendirme.component";
import { AluminyumRaporComponent } from './pages/aluminyum-rapor/aluminyum-rapor.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: 'home',
        component: AnaSayfaComponent,
      },
      {
        path: "home/rapor",
        component: RaporChartComponent,
      },
      {
        path: "home/dinamik-rapor",
        component: DinamikRaporComponent,
      },
      {
        path: "home/siparis-girisi",
        component: SiparisGirisiComponent,
      },
      {
        path: "home/yetkilendirme",
        component: YetkilendirmeComponent,
      },
      {
        path: "home/dokum-stok-girisi",
        component: DokumStokGirisiComponent,
      },
      {
        path: "home/aluminyum-rapor",
        component: AluminyumRaporComponent,
      }
    ],
  },
];
