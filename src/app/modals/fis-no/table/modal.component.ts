import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {ModalFisnoFilterComponent} from '../filter/filter.component';
import {Spd} from 'src/app/models/spd';
import {NgScrollbarModule} from 'ngx-scrollbar';
import {DemoMaterialModule} from '../../../demo-material-module';
import {FilterModel} from 'src/app/models/filter';
import {SpdService} from 'src/app/services/spd.service';
import {MatPaginator} from "@angular/material/paginator";
import {DxLoadIndicatorModule} from "devextreme-angular";

@Component({
  selector: 'app-fisNo-table-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatTableModule,
    MatDialogModule,
    DemoMaterialModule,
    NgScrollbarModule,
    MatOptionModule,
    DxLoadIndicatorModule,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalFisnoTableComponent implements OnInit {
  displayedColumns: string[] = [
    'frm_ksad',
    'spd_st_kod',
    'spd_no1',
    'spd_no2',
    'spd_sira',
    'spd_mm_kod',
    'mm_ad',
    'spd_mmetretul',
    'spd_amb_mkt',
    'spd_mkt',
    'spd_amb_kod',
    'spd_eb_kod',
    'spd_frm_sipno',
    'spd_smkt_top',
    'spd_smkt_kg',
    'compute_bakiye_boy',
    'compute_bakiye_miktar',
  ];
  columns: string[] = [
    'Firma',
    'Satış Türü',
    'Yıl',
    'Sipriş No',
    'Sıra',
    'Profil No',
    'Adı',
    'Birim Boy',
    'Boy Adedi',
    'Miktar (kg)',
    'Paket Türü',
    'Alaşım',
    'Termik',
    'Sevk Boy Adedi',
    'Sevk Miktar (kg)',
    'Bakiye Boy Adedi',
    'Bakiye Miktar',
  ];
  selectedColumn: string = '';
  saveAs: string = '';
  searchText: string = '';
  loadIndicatorVisible = false;
  dataSource: MatTableDataSource<Spd>;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ModalFisnoTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private Sp: SpdService,
  ) {
    this.saveAs = data.saveAs;
  }

  ngOnInit() {
    this.openModal();
  }

  transformColumns(item: any): any {
    const transformedItem: any = {};
    this.displayedColumns.forEach((columnName) => {
      transformedItem[columnName] = this.transformSaleType(columnName, item);
    });
    return transformedItem;
  }

  transformSaleType(columnName: string, item: any): any {
    if (columnName === 'spd_st_kod') {
      return item[columnName] === 'S' ? 'Satış' : 'Fason';
    } else if (columnName === 'compute_bakiye_boy') {
      const spd_amb_mkt = item['spd_amb_mkt'];
      const spd_mkt_top = item['spd_mkt_top'];
      const spd_smkt_top = item['spd_smkt_top'];

      if (spd_amb_mkt > spd_mkt_top) {
        return spd_amb_mkt - spd_smkt_top;
      } else {
        return 0;
      }
    } else if (columnName === 'compute_bakiye_miktar') {
      const spd_mkt = item['spd_mkt'];
      const spd_smkt_kg = item['spd_smkt_kg'];

      return spd_mkt > spd_smkt_kg ? spd_mkt - spd_smkt_kg : 0;
    } else if (columnName === 'compute_ambalaj_ad') {
      const spd_amb_kod = item['spd_amb_kod'];

      // return spd_amb_kod !== '' ? rof_ambalaj_string(spd_amb_kod, 'ab_ad') : '';
    }
    return item[columnName];
  }

  onRowClick(row: any): void {
    this.selectedColumn = row;
  }

  applyFilter() {
    this.dataSource.filter = this.searchText.trim().toLowerCase();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onAdd(): void {
    this.dialogRef.close(this.selectedColumn);
  }

  openModal(): void {
    const dialogRef = this.dialog.open(ModalFisnoFilterComponent, {
      backdropClass: 'custom-backdrop',
      width: '40%',
      data: {},
    });

    dialogRef.backdropClick().subscribe(() => {
      dialogRef.close('');
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === undefined)
        this.getFilterData();
    });
  }


  getFilterData() {
    this.loadIndicatorVisible = true;
    const filterValuesString = sessionStorage.getItem('filterModal');
    const filterValues = JSON.parse(filterValuesString);
    const filterItems: FilterModel = {
      filterValue1: Number(localStorage.getItem('srk_no')),
      filterValue2: 150,
      filterValue3: filterValues.yil_i,
      filterValue4: filterValues.yil_s,
      filterValue5: filterValues.sipno_i,
      filterValue6: filterValues.sipno_s,
      filterValue7: filterValues.id_i,
      filterValue8: filterValues.id_s,
      filterValue20: filterValues.frm_kod_i,
      filterValue21: filterValues.frm_kod_s,
      filterValue22: filterValues.mm_kod_i,
      filterValue23: filterValues.mm_kod_s,
      filterValue24: filterValues.urun_tipi,
      filterValue25: filterValues.urun_tipi,
      filterValue26: filterValues.cl_kod_i,
      filterValue27: filterValues.cl_kod_s,
      filterValue30: filterValues.as_kod_i,
      filterValue31: filterValues.as_kod_s,
      filterValue32: filterValues.bitis,
      filterValue33: filterValues.bitis,
      filterValue34: filterValues.sptrh_i,
      filterValue35: filterValues.sptrh_s,
    };

    this.Sp.spdFilter(filterItems).subscribe(
      (response: any) => {
        const modifiedData: Spd[] = response.data.map((item: any) => {
          return this.transformColumns(item);
        });
        this.dataSource = new MatTableDataSource<Spd>(modifiedData);
        this.dataSource.paginator = this.paginator;
        this.loadIndicatorVisible = false;
      },
      (error) => {
        this.loadIndicatorVisible = false;
        console.error('Tablo çekme hatası:', error);
      },
    );
  }
}
