import {Component, Inject, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { Lfyd } from 'src/app/models/lfyd';
import { LfydService } from 'src/app/services/lfyd.service';
import { ColorsService } from 'src/app/services/colors.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';
@Component({
  selector: 'app-teklif-id',
  standalone: true,
  imports: [CommonModule,
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
    MatPaginatorModule,
    MatDialogModule,],
  templateUrl: './teklif-id.component.html',
  styleUrl: './teklif-id.component.scss'
})

export class ModalTeklifIdComponent {
  @ViewChild(MatPaginator) paginator: MatPaginator;


  selectedColumn: string = '';
  saveAs: string = '';
  searchText: string = '';
  frm_kod: string = '';

  dataSource: MatTableDataSource<Lfyd>;

  displayedColumns: string[] = [
    'frm_ksad',
    'lfyd_trh',
    'lfyd_liste',
    'lfyd_kod',
    'lfyd_kod1',
    'lfyd_mm_kod',
    'mm_ad',
    'lfyd_kod2',
    'lfyd_acik2',
    'lfyd_grmj',
    'cl_ad',
    'lfyd_cl_kod',
    'cmpt_cl_ad',
    'lfyd_listfiyat',
    'lfyd_dvz_kod',
  ];
  columns: string[] = [
    'Firma',
    'Tarih',
    'Liste No',
    'Kodu',
    'Id',
    'Profi No',
    'Adı',
    'Alaşım',
    'Termik',
    'Birim Boy',
    'Ürün Tipi',
    'Renk Kodu',
    'Adı',
    'Teklif Fiyatı',
    'Döviz Birimi',
  ];


  ngOnInit() {
    this.lfydService.getLfyd(this.frm_kod).subscribe(
      (response: any) => {
        const lfydData: Lfyd[] = response.data; /*.map((item: any) => {
          return this.transformColumns(item);
        }); */

        const columnNameToCheck = 'lfyd_acik2';

        lfydData.forEach((item: Lfyd) => {
          if (!item[columnNameToCheck]) {
            item[columnNameToCheck] = 'Termiksiz';
          }
        });

        this.dataSource = new MatTableDataSource<Lfyd>(lfydData);
        this.dataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Lfyd çekme hatası:', error);
      },
    );
  }
  onRowClick(row: any): void {
    this.selectedColumn = row;
  }

  applyFilter() {
    this.dataSource.filter = this.searchText.trim().toLowerCase();
  }

  constructor(
    public dialogRef: MatDialogRef<ModalTeklifIdComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private lfydService: LfydService,
    private colorService: ColorsService,
  ) {
    this.saveAs = data.saveAs;
    this.frm_kod = data.frm_kod;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onAdd(): void {
    this.dialogRef.close(this.selectedColumn);
  }
}

