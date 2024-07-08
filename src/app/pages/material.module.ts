import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {CommonModule} from '@angular/common';
import { DemoMaterialModule } from '../demo-material-module';
import { MaterialRoutes } from './material.routing';
import { AnaSayfaComponent } from './anasayfa/anasayfa.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    DemoMaterialModule,
    HttpClientModule,

  ],
  providers: [AnaSayfaComponent],
})
export class MaterialComponentsModule {}
