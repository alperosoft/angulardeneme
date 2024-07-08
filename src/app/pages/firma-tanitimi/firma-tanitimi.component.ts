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

@Component({
  selector: 'app-firma-tanitimi',
  standalone: true,
  imports: [CommonModule, DxDrawerModule, DxSpeedDialActionModule, DxSelectBoxModule, DxListModule, DxRadioGroupModule, DxToolbarModule, AppHeaderComponent, DxDataGridModule, DxDateBoxModule, DxDropDownBoxModule, DxFormModule, DxiColumnModule, DxoFilterRowModule, DxoPagingModule, MatButtonModule, MatCardModule, MatIconModule, DevExtremeModule, ],
  templateUrl: './firma-tanitimi.component.html',
  styleUrl: './firma-tanitimi.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FirmaTanitimiComponent implements OnInit {

  firma: Firma[] = [];

  sirketNo = Number(localStorage.getItem('srk_no'));

  loadIndicatorVisible = false;
  selectedRow: string;

  constructor(private toastr: ToastrService,
              private firmaService: FirmaService,
              public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadIndicatorVisible = true;
    this.onGetRow();
  }

  setData(data: any): void {
    this.firma = data;

    this.firma.map((data: Firma) => {
      if (data.frm_efat_sw === 0) {
        data.frm_efat_sw = "Hayır";
      } else if (data.frm_efat_sw === 1) {
        data.frm_efat_sw = "Evet";
      }

      if (Number(data.frm_i3) === 0) {
        data.frm_i3 = "";
      } 
      
      if (data.frm_ktgr_kod === "MUS") {
        data.frm_ktgr_kod = "Müşteri";
      } else if (data.frm_ktgr_kod === "FAT") {
        data.frm_ktgr_kod = "Tedarikçi";
      }
      return data;
    });
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
    this.firmaService.getSirket().subscribe(
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
