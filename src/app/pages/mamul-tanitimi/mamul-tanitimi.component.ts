import {Component, OnInit, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppHeaderComponent} from "../../layouts/full/header/header.component";
import {
  DevExtremeModule,
  DxDataGridModule,
  DxDateBoxModule,
  DxDropDownBoxModule,
  DxFormModule,
  DxListModule,
  DxRadioGroupModule,
  DxSpeedDialActionModule,
  DxToolbarModule,
} from "devextreme-angular";
import {DxiColumnModule, DxoFilterRowModule, DxoPagingModule,} from "devextreme-angular/ui/nested";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {ToastrService} from "ngx-toastr";
import {DxDrawerModule} from 'devextreme-angular/ui/drawer';
import {DxSelectBoxModule} from 'devextreme-angular/ui/select-box';
import { FirmaService } from 'src/app/services/firma.service';
import { Firma } from 'src/app/models/firma';
import { CariHesapTanitimiModalComponent } from 'src/app/modals/cari-hesap-tanitimi/cari-hesap-tanitimi.component';
import { MatDialog } from '@angular/material/dialog';
import { MamlzService } from 'src/app/services/mamlz.service';
import { Mamlz } from 'src/app/models/mamlz';

@Component({
  selector: 'app-mamul-tanitimi',
  standalone: true,
  imports: [CommonModule, DxDrawerModule, DxSpeedDialActionModule, DxSelectBoxModule, DxListModule, DxRadioGroupModule, DxToolbarModule, AppHeaderComponent, DxDataGridModule, DxDateBoxModule, DxDropDownBoxModule, DxFormModule, DxiColumnModule, DxoFilterRowModule, DxoPagingModule, MatButtonModule, MatCardModule, MatIconModule, DevExtremeModule, ],
  templateUrl: './mamul-tanitimi.component.html',
  styleUrl: './mamul-tanitimi.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MamulTanitimiComponent implements OnInit {

  mamlz: Mamlz[] = [];
  firma: Firma[] = [];

  sirketNo = Number(localStorage.getItem('srk_no'));

  loadIndicatorVisible = false;
  selectedRow: string;

  constructor(private toastr: ToastrService,
              private firmaService: FirmaService,
              private mamlzService: MamlzService,
              public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadIndicatorVisible = true;
    this.onGetRow();

   /* this.firmaService.get().subscribe(
      (response: any) => {
      if (response) {
      //  this.firma = response.data;
      console.warn(response.data)
      } else {
        this.toastr.info('Kayıt yok.', ' ', {
          positionClass: 'toast-top-right',
        });
      }
    }, error => {
      console.warn(error)
      this.toastr.error('Hata gerçekleşti', 'Hata', {
        positionClass: 'toast-top-right',
      });
    });*/
  }

  setData(data: any): void {
    this.mamlz = data;

    this.mamlz.map((data: Mamlz) => {
      if(data.mm_grp && data.cmpt_grp) {
        data.compute_grp = data.mm_grp  + ' ' + data.cmpt_grp;
      }
      if(data.mm_grp1_kod && data.cmpt_grp1) {
        data.compute_grp1 = data.mm_grp1_kod  + ' ' + data.cmpt_grp1;
      }

      if(data.mm_i1 == 0) {
        data.compute_i1
      } 
    });
    
    console.warn(data);
  }

  onEditRow(): void {
    if(!this.selectedRow) {
      this.toastr.error('Lütfen düzenlemek istediğiniz satırı seçin.', 'Hata', {
        positionClass: 'toast-top-right',
      });
      return;
    }
    this.openModal(this.selectedRow);
  }

  onAddRow(): void {
    this.openModal();
  }

  onRowClick(event: any): void {
    this.selectedRow = event.data.frm_kod;
  }

  onRowDoubleClick(event: any): void {
    this.openModal(event.data.frm_kod);
  }

  onDelete(): void {
    if(!this.selectedRow) {
      this.toastr.error('Lütfen silmek istediğiniz satırı seçin.', 'Hata', {
        positionClass: 'toast-top-right',
      });
      return;
    }
    if (confirm("Kayıtı silmek istediğinden emin misin?")) {
      this.firmaService.delete(this.selectedRow).subscribe(
        (response) => {
          this.onGetRow();
          this.toastr.success('Başarıyla kayıt silindi!', '', {
            positionClass: 'toast-top-right',
          });
        },
        (error) => {
          console.warn(error);
          this.toastr.error('Kayıt silinirken hata oldu!', 'Hata', {
            positionClass: 'toast-top-right',
          });
        },
      );
  }
  }

  onGetRow(): void {
    this.mamlzService.getAll(this.sirketNo).subscribe(
      (response: any) => {
      this.loadIndicatorVisible = true;
      if (response) {
        this.setData(response.data);
      } else {
        this.toastr.info('Kayıt yok.', ' ', {
          positionClass: 'toast-top-right',
        });
      }
      this.loadIndicatorVisible = false;
    }, error => {
      this.loadIndicatorVisible = false;
      this.toastr.error('Hata gerçekleşti', 'Hata', {
        positionClass: 'toast-top-right',
      });
    });
  }

openModal(frm_kod?: string): void {
  const dialogRef = this.dialog.open(CariHesapTanitimiModalComponent, {
    width: '100%',
    data: frm_kod,
  });

  dialogRef.backdropClick().subscribe(() => {
    dialogRef.close('');
  });

  dialogRef.afterClosed().subscribe((result) => {
    this.onGetRow();
  });
}

}
