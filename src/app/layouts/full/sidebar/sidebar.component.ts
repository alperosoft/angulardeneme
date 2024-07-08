import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import {
  DxCheckBoxModule,
  DxDrawerModule,
  DxListModule,
  DxMenuModule,
  DxSelectBoxModule,
  DxToolbarModule,
} from 'devextreme-angular';
import { DxTreeViewModule } from 'devextreme-angular/ui/tree-view';
import { DxContextMenuModule } from 'devextreme-angular/ui/context-menu';
import { MenuService } from 'src/app/services/menu.service';
import { jwtDecode } from 'jwt-decode';
import { FilterModel } from 'src/app/models/filter';
import { CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { DragTransferService } from '../../../services/data-send.service';
import { Router, RouterLink } from '@angular/router';
import DevExpress from 'devextreme';
import { Service, List } from '../../../services/app.service';

interface TreeItem {
  id: number;
  text: string;
  url: string;
}

@Component({
  imports: [
    DxListModule,
    DxTreeViewModule,
    DxContextMenuModule,
    DxMenuModule,
    DxSelectBoxModule,
    DxCheckBoxModule,
    CdkDropList,
    CommonModule,
    DragDropModule,
    DxDrawerModule,
    DxToolbarModule,
    RouterLink,
  ],
  standalone: true,
  selector: 'app-sidebar',
  templateUrl: 'sidebar.component.html',
  styleUrls: ['sidebar.component.scss'],
})
export class AppSidebarComponent implements OnInit {
  isDragging: boolean = false;
  draggedItem: any;
  draggedPositionX: number = 0;
  draggedPositionY: number = 0;

  @Output() dragDataEvent = new EventEmitter<any>();
  menu: any[];
  us_kod: string = '';
  filterValues: FilterModel = {};
  cards: any[] = [];

  treeData: TreeItem[] = [
    { id: 1, text: 'Stok Girişi', url: 'dokum-stok-girisi' },
    { id: 2, text: 'Sipariş Girişi', url: 'siparis-girisi' },
    { id: 3, text: 'Rapor', url: 'dinamik-rapor' },
  ];

  constructor(
    public menuService: MenuService,
    private dataTransferService: DragTransferService,
    private router: Router,
    private service: Service,
  ) {
    const decodedToken = jwtDecode(localStorage.getItem('cmpt_token'));
    this.us_kod =
      decodedToken[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
      ];
    this.filterValues.filterValue21 = this.us_kod;
    this.filterValues.filterValue1 = 1;
  }

  ngOnInit() {
    this.menuService.getMenu(this.filterValues).subscribe((response) => {
      console.error(response['data']);
      this.menu = response['data'];
    });
  }

  onItemClick(data: any) {
    const url = data?.mnew_url;
    if (url) {
      this.router.navigate(['home/' + url]);
    }
  }

  onMouseMove(event: MouseEvent): void {
    this.updateDraggedPosition(event.clientX, event.clientY);
  }

  updateDraggedPosition(clientX: number, clientY: number): void {
    this.draggedPositionX = clientX;
    this.draggedPositionY = clientY;
  }

  onDragStart(event: MouseEvent, item: any): void {
    if (item.items && item.items.length > 0) {
      return;
    }

    const itemId = item?.menuPrimNo; //Menü ID
    const itemTitle = item?.text;
    const itemIcon = item?.mnew_resim1;
    const itemUrl = item?.mnew_url;
    this.dataTransferService.sendData(itemId, itemTitle, itemIcon, itemUrl);

    this.isDragging = true;
    this.draggedItem = item;
    this.updateDraggedPosition(event.clientX, event.clientY);

    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    window.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  onMouseUp(event: MouseEvent): void {
    // Sürüklenen öğe altında alt öğeler varsa, sürükleme işlemi engellenir
    if (
      this.draggedItem &&
      this.draggedItem.items &&
      this.draggedItem.items.length > 0
    ) {
      event.preventDefault();
      return;
    }

    // Mouse up olayı gerçekleştiğinde yapılacak işlemler
    this.isDragging = false;
    this.draggedItem = null;
    this.draggedPositionX = 0;
    this.draggedPositionY = 0;
    window.removeEventListener('mousemove', this.onMouseMove.bind(this));
    window.removeEventListener('mouseup', this.onMouseUp.bind(this));
  }

  navigateToPage(data: any): void {
    // const url = data?.mnew_url;
    const title = data?.text;
    console.warn('url MENU ' + title);
    if (title) {
      if (title === "Alüminyum Stok Girişi") {
        this.router.navigate(['home/dokum-stok-girisi']);
      } else if (title === 'Alüminyum Sipariş Girişi') {
        this.router.navigate(['home/siparis-girisi']);
      } else if (title === 'Döküm Takip Raporu') {
        this.router.navigate(['home/aluminyum-rapor']);
      }
    }
  }
}
