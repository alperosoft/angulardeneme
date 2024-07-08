// full.component.ts
import { MediaMatcher } from '@angular/cdk/layout';
import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import { MenuItems } from '../../shared/menu-items/menu-items';

@Component({
  selector: 'app-full-layout',
  templateUrl: 'full.component.html',
  
})
export class FullComponent implements OnDestroy, AfterViewInit {
  mobileQuery: MediaQueryList;
  isSidebarOpen: boolean = true;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public menuItems: MenuItems,
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 1024px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngAfterViewInit() {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  openSuz(){
    
  }
}
