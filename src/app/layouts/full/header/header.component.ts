import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from '@angular/router';
import {DxMenuTypes} from 'devextreme-angular/ui/menu';
import {FilterModel} from 'src/app/models/filter';
import {DxMenuModule, DxToolbarModule} from 'devextreme-angular';
import {CommonModule} from '@angular/common';
import {topPage, topPages} from 'src/app/constants';
import {DemoMaterialModule} from 'src/app/demo-material-module';
import {KillJobMethod} from 'src/app/global_methods/killjob.method';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [],
  imports: [CommonModule, DxMenuModule, DemoMaterialModule, DxToolbarModule],
  standalone: true,
})
export class AppHeaderComponent {

  constructor(
    private router: Router,
    private killJobMethod: KillJobMethod
  ) {
  }

  us_kod: string;
  filterValues: FilterModel = {};

  storageItem: string[] = ['cmpt_token', 'us_degree', 'us_ad', 'srk_no'];

  title: string = localStorage.getItem('us_ad');
  currentProduct: any;

  topPages: topPage[] = topPages;

  itemClick(data: DxMenuTypes.ItemClickEvent) {
    const item = data.itemData as topPage;
    console.log(item.path);
    this.killJobMethod.killJob()
    this.router.navigate([item.path]);
  }

  onLogout() {
    this.killJobMethod.killJob()
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
