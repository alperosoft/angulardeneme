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
import {Mamlz} from 'src/app/models/mamlz';
import {MamlzService} from 'src/app/services/mamlz.service';

@Component({
  selector: 'app-mamul-bilgileri',
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
  templateUrl: './mamul-bilgileri.component.html',
  styleUrl: './mamul-bilgileri.component.scss'
})
export class ModalMamulComponent {
  displayedColumns: string[] = [
    'mm_orjkod',
    'mm_kod',
    'mm_ad',
    'mm_cins',
    'cmpt_grp',
    'mm_barkod',
    'mm_birim',
    'mm_satis_fiyat',
    'mm_satis_dvz_kod',
    'mm_grmj2',
    'mm_ad_ydil',
    'mm_primno',
    'mm_dp_no',
  ];
  columns: string[] = [
    'OrjinalKod',
    'Stok Kodu',
    'Stok Adı',
    'Grubu',
    'Barkod',
    'Birim',
    'Satış Fiyatı',
    '',
    'Ham Gramaj',
    'Yabancı Dil',
    'Stok Id',
    'Depo No',
  ];
  selectedColumn: string = '';
  saveAs: string = '';
  searchText: string = '';

  dataSource: MatTableDataSource<Mamlz>;

  ngOnInit() {
    this.mamlzService
      .getMamlz(1, 0, '101.01', 'ELK.GNL.1969', 'ZZKAL01')
      .subscribe(
        (response: any) => {
          this.dataSource = new MatTableDataSource<Mamlz>(response.data);
        },
        (error) => {
          console.error('Mamlz çekme hatası:', error);
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
    public dialogRef: MatDialogRef<ModalMamulComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private mamlzService: MamlzService,
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
