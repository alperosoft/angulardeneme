import {Component, Inject} from '@angular/core';
import {CommonModule} from '@angular/common';
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
  selector: 'app-talimat-bilgileri',
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
    MatDialogModule,],
  templateUrl: './talimat-bilgileri.component.html',
  styleUrl: './talimat-bilgileri.component.scss'
})

export class ModalTalimatComponent {
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
    'frm_frm_kod',
    'abc',
    'cba',
    'bca',
  ];
  columns: string[] = [
    '',
    'Talimat Kodu',
    'Adı',
    'Grup',
    '',
    'Fire (%)',
    'Kompozisyon',
    'Açıklama',
    'En',
    'Grj',
    'Mlyt.Kodu',
    'Not',
    'Fiyat Grubu',
  ];

  ikinciColumn: string[] = ['frm_kod', 'frm_ad', 'frm_ksad', 'frmg_ad'];
  ikinci: string[] = ['', 'Sıra', 'Proses Kodu', 'Adı'];

  selectedColumn: string = '';
  saveAs: string = '';
  searchText: string = '';

  dataSource: MatTableDataSource<Firma>;

  ngOnInit() {
    this.firmaService.getSirket().subscribe(
      (response: any) => {
        this.dataSource = new MatTableDataSource<Firma>(response.data);
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
    public dialogRef: MatDialogRef<ModalTalimatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firmaService: FirmaService,
  ) {
    this.saveAs = data.saveAs;
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onAdd(): void {
    this.dialogRef.close(this.selectedColumn);
  }
}

