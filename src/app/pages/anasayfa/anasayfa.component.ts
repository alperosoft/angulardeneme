import {DemoMaterialModule} from 'src/app/demo-material-module';
import {CommonModule, DatePipe} from '@angular/common';
import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {NgScrollbarModule} from 'ngx-scrollbar';
import {Service} from 'src/app/services/app.service';
import {
  DxChartModule,
  DxCheckBoxModule,
  DxMenuModule,
  DxScrollViewModule,
  DxSelectBoxModule,
  DxSortableModule,
  DxTabPanelModule,
} from 'devextreme-angular';
import {AppHeaderComponent} from '../../layouts/full/header/header.component';
import {CdkDragDrop, CdkDragEnter, CdkDragMove, CdkDropList, moveItemInArray,} from "@angular/cdk/drag-drop";
import {AppSidebarComponent} from "../../layouts/full/sidebar/sidebar.component";
import {DragTransferService} from "../../services/data-send.service";
import {DxTabsModule} from "devextreme-angular";
import {KanbanBoardService} from "../../services/kanban-board.service";
import {ToastrService} from "ngx-toastr";
import {Kanbanboard} from "../../models/kanbanboard";
import {Stkf} from "../../models/stkf";
import {DxPieChartModule} from 'devextreme-angular';
import {TahsilatlarComponent} from "./tahsilatlar/tahsilatlar.component";

@Component({
  selector: 'app-anasayfa',
  standalone: true,
  templateUrl: './anasayfa.component.html',
  styleUrls: ['./anasayfa.component.scss'],
  preserveWhitespaces: true,
  providers: [Service],
  imports: [
    DemoMaterialModule,
    RouterModule,
    CommonModule,
    MatIconModule,
    NgScrollbarModule,
    AppHeaderComponent,
    CdkDropList,
    AppSidebarComponent,
    DxTabsModule,
    DxTabPanelModule,
    DxScrollViewModule,
    DxSortableModule,
    DxMenuModule,
    DxSelectBoxModule,
    DxCheckBoxModule,
    DxChartModule, DxPieChartModule, TahsilatlarComponent
  ],
})
export class AnaSayfaComponent implements OnInit {

  @ViewChild('dropListContainer') dropListContainer?: ElementRef;

  dropListReceiverElement?: HTMLElement;
  dragDropInfo?: {
    dragIndex: number;
    dropIndex: number;
  };

  dropdownOpen: boolean = false;
  kanbans: Kanbanboard[];
  constructor(private dataService: DragTransferService,
              private route: ActivatedRoute,
              private kanbanBoardService: KanbanBoardService,
              private toastr: ToastrService,
              private router:Router) {
  }

  ngOnInit(): void {

    this.router.navigate(['/home/siparis-girisi']);

    // this.dataService.getData().subscribe(data => {
    //   if (data === null)
    //     return;
    //
    //   const currentRoute = this.route.snapshot;
    //   const path = currentRoute.routeConfig?.path; // URL'nin path'ini alır
    //   if (path !== "home")
    //     return;
    //
    //   const kanban = new Kanbanboard();
    //
    //   kanban.kart_id = 0;
    //   kanban.menu_id = parseInt(data.menu_id.toString().split('_').pop());//data.menu_id;
    //   kanban.kart_text = data.kart_text;
    //   kanban.kart_icon = data.kart_icon;
    //   kanban.kart_url = data.kart_url;
    //   kanban.kullanici_id = 0;
    //   kanban.idt = new Date();
    //   kanban.udt = new Date();
    //   kanban.kullanici_kodu = localStorage.getItem('kullanici_adi');
    //   kanban.srk_no = Number(localStorage.getItem('srk_no'));
    //
    //   if (this.kanbans && this.kanbans.length > 0) {
    //     const existingTaskIndex = this.kanbans.findIndex(task => task.kart_text === data.kart_text);
    //     if (existingTaskIndex === -1) {
    //       kanban.kart_index = this.kanbans.length + 1;
    //       this.kanbans.push(kanban);
    //     }
    //   } else {
    //     this.kanbans = [];
    //     kanban.kart_index = 1;
    //     this.kanbans.push(kanban);
    //   }
    // });
  }

  dragEntered(event: CdkDragEnter<number>) {
    const drag = event.item;
    const dropList = event.container;
    const dragIndex = drag.data;
    const dropIndex = dropList.data;

    this.dragDropInfo = {dragIndex, dropIndex};
    const phContainer = dropList.element.nativeElement;
    const phElement = phContainer.querySelector('.cdk-drag-placeholder');

    if (phElement) {
      phContainer.removeChild(phElement);
      phContainer.parentElement?.insertBefore(phElement, phContainer);
      moveItemInArray(this.kanbans, dragIndex, dropIndex);
    }
  }

  dragMoved(event: CdkDragMove<number>) {
    if (!this.dropListContainer || !this.dragDropInfo) return;

    const placeholderElement =
      this.dropListContainer.nativeElement.querySelector('.cdk-drag-placeholder');

    const receiverElement =
      this.dragDropInfo.dragIndex > this.dragDropInfo.dropIndex
        ? placeholderElement?.nextElementSibling
        : placeholderElement?.previousElementSibling;

    if (!receiverElement)
      return;

    receiverElement.style.display = 'none';
    this.dropListReceiverElement = receiverElement;
  }

  dragDropped(event: CdkDragDrop<number>) {
    if (!this.dropListReceiverElement) {
      return;
    }

    this.dropListReceiverElement.style.removeProperty('display');
    this.dropListReceiverElement = undefined;
    this.dragDropInfo = undefined;
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.dropdownOpen = !this.dropdownOpen;
  }

  // Kaydet fonksiyonu
  save(event: Event) {
    event.preventDefault();
    this.kanbanBoardService.save(this.kanbans).subscribe(
      response => {
        if (response.statusCode === 200) {
          if (response.rowCount > 0) {
            this.kanbans = response.data.result;
          }
        } else {
          this.kanbans = [];
        }

        this.toastr.success('Kayıt başarılı');
      },
      error => {
        this.toastr.error('Kayıt hatası:', error);
      }
    );
  }

  //Kartın üstündeki çarpı iconu görevi...
  delete(index: number, item: Kanbanboard) {
    if (item.kart_id === 0)
      this.kanbans.splice(index, 1);
    else {
      this.kanbanBoardService.delete(item.kart_id).subscribe(
        response => {
          if (response.statusCode === 200) {
            this.kanbans.splice(index, 1);
          }
        },
        error => {
          this.toastr.error('Kayıt silinirken hata oluştu.');
        }
      );
    }
  }

// Yenile fonksiyonu
  refresh(event: Event) {
    event.preventDefault();
    this.getAllKanban();
  }

// Tamamını Sil fonksiyonu
  deleteAll(event: Event) {
    event.preventDefault();

    this.kanbanBoardService.deleteAll().subscribe(
      response => {

        if (response.statusCode === 200)
          this.kanbans = [];
        else
          this.toastr.error('Kayıtlar silinirken hata oluştu.');

      }, error => {
        this.toastr.error('Kayıt silinirken hata oluştu.');
      }
    );
  }

  closeDropdown() {
    this.dropdownOpen = false;
  }

  private getAllKanban(): void {
    this.kanbanBoardService.get().subscribe(x => {
        if (x.statusCode === 200) {
          this.kanbans = x.data.result;
        } else {
          this.toastr.error('Bir hata oluştu!', 'Hata', {
            positionClass: 'toast-top-right',
          });
        }
      },
      error => {
        this.toastr.error('Bir hata oluştu!', 'Hata', {
          positionClass: 'toast-top-right',
        });
      }
    );
  }
}

//console.log("Dikkat" +  (kod1 && 'koddolu=' + kod1) || 'kodBos=' +'');
