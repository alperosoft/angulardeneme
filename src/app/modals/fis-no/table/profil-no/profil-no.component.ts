import {Component, Inject} from '@angular/core';
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
import {MatNativeDateModule} from '@angular/material/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {SpService} from 'src/app/services/sp.service';
import {Spd} from 'src/app/models/spd';
import {MamlzService} from 'src/app/services/mamlz.service';
import {Mamlz} from 'src/app/models/mamlz';
import {FilterModel} from 'src/app/models/filter';

@Component({
  selector: 'app-profil-no',
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
  ],
  templateUrl: './profil-no.component.html',
  styleUrl: './profil-no.component.scss'
})
export class ModalProfilComponent {
  displayedColumns: string[] = [
    'mm_kod',
    'mm_ad',
    'mm_cins',
    'compute_group',
    'mm_ad_ydil',
    'mm_barkod',
    'cmpt_ipno',
    'mm_orjkod',
    'mm_dp_no',
    'cmpt_bakiye_mkt',
    'mm_birim',
    'mm_satis_fiyat',
    'mm_satis_dvz_kod',
    'mm_primno',
    'mm_grmj2',
    'compute_rct',
    'cmpt_mm_yok',
  ];
  columns: string[] = [
    'Stok kodu',
    'Stok Adı',
    'Cinsi',
    'Grubu',
    'Yabancı Dil Adı',
    'Barkod',
    'İplik No',
    'Depo No',
    'Depo Stok',
    'Birim',
    'Stok Id',
    'Ham Gramaj',
    'Reçete',
    'Durumu',
  ];
  selectedColumn: string = '';
  saveAs: string = '';
  searchText: string = '';

  dataSource: MatTableDataSource<Mamlz>;

  ngOnInit() {
    const _filterModel = new FilterModel();

    _filterModel.filterValue1 = 1; // srk_no
    _filterModel.filterValue2 = 1; // mm_tur
    _filterModel.filterValue3 = 0; // mm_mlz_tur
    _filterModel.filterValue4 = 0; // an_left
    _filterModel.filterValue5 = 0; // mm_yok

    _filterModel.filterValue20 = ''; // as_left_kod
    _filterModel.filterValue21 = 'HYD.005'; // as_kod_i
    _filterModel.filterValue22 = 'HYD.008'; // as_kod_s

    this.Mamlz.getMamlzYardim(_filterModel).subscribe(
      (response: any) => {
        // Sütun dönüşümlerini gerçekleştirmek için map fonksiyonu kullanılıyor
        const modifiedData: Mamlz[] = response.data.map((item: any) => {
          return this.transformColumns(item);
        });

        this.dataSource = new MatTableDataSource<Mamlz>(modifiedData);
      },
      (error) => {
        console.error('Tablo çekme hatası:', error);
      },
    );
  }

  transformColumns(item: any): any {
    const transformedItem: any = {};
    this.displayedColumns.forEach((columnName) => {
      transformedItem[columnName] = this.transformSaleType(columnName, item);
    });
    return transformedItem;
  }

  transformSaleType(columnName: string, item: any): any {
    if (columnName === 'compute_grop') {
      const mm_grp = item['mm_grp'];
      const cmpt_grp = item['cmpt_grp'];
      return item[columnName] === mm_grp + '' + cmpt_grp;
    } else if (columnName === 'cmpt_bakiye_mkt') {
      const mm_stk_mkt_gir = item['mm_stk_mkt_gir'];
      const mm_stk_mkt_cik = item['mm_stk_mkt_cik'];
      return item[columnName] === (mm_stk_mkt_gir - mm_stk_mkt_cik !== 0)
        ? mm_stk_mkt_gir - mm_stk_mkt_cik
        : 0;
    } else if (columnName === 'compute_rct') {
      const cmpt_rct = item['cmpt_rct'];
      return item[columnName] === cmpt_rct > 0
        ? 'R' + (cmpt_rct === 1 ? '' : ' ' + String(cmpt_rct))
        : '';
    } else if (columnName === 'cmpt_mm_yok') {
      //IF ( mm_yok =1, 'Pasif', 'Aktif')
      const mm_yok = item['mm_yok'];
      return item[columnName] === (mm_yok === 1 ? 'Pasif' : 'Aktif');
    }

    return item[columnName];
  }

  onRowClick(row: any): void {
    this.selectedColumn = row;
  }

  applyFilter() {
    this.dataSource.filter = this.searchText.trim().toLowerCase();
  }

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ModalProfilComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private Sp: SpService,
    private Mamlz: MamlzService,
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
