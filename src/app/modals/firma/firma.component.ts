import {Component, Inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import {
  MAT_DIALOG_DATA,
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
import {MatNativeDateModule} from '@angular/material/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {FirmaService} from '../../services/firma.service';
import {Firma} from 'src/app/models/firma';

@Component({
  selector: 'app-firma',
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
    MatProgressSpinnerModule,
    MatDialogModule,],
  templateUrl: './firma.component.html',
  styleUrl: './firma.component.scss'
})
export class ModalFirmaComponent implements OnInit {
  displayedColumns: string[] = [
    'frm_kod',
    'frm_ad',
    'frm_ksad',
    'frmg_ad',
    'frm_i3',
    'frm_vergno',
    'frm_vergda',
    'frm_sehir',
    'frm_hsp_kod',
  ];
  columns: string[] = [
    'Firma Kodu',
    'Adı',
    'Kısa Adı',
    'Firma Grubu',
    'Liste',
    'Vergi No',
    'Vergi Dairesi',
    'Şehir',
    'Hesap Kodu',
  ];
  selectedColumn: string = '';
  saveAs: string = '';
  searchText: string = '';
  isDetailLoading: boolean = true;

  dataSource: MatTableDataSource<Firma>;

  ngOnInit() {
    this.isDetailLoading = true;

    this.firmaService.getSirket().subscribe(
      (response: any) => {
        this.dataSource = new MatTableDataSource<Firma>(response.data);
        this.isDetailLoading = false;

      },
      (error) => {
        console.error('Firma çekme hatası:', error);
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
    public dialogRef: MatDialogRef<ModalFirmaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firmaService: FirmaService,
  ) {
    //this.saveAs = data.saveAs;
  }
  onClose(): void {
    this.dialogRef.close(this.selectedColumn);
  }
  onAdd(): void {
    this.dialogRef.close(this.selectedColumn);
  }
}
