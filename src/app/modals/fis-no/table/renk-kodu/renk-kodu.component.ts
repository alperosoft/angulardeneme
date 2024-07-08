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
import {MamlzService} from 'src/app/services/mamlz.service';
import {Mamlz} from 'src/app/models/mamlz';
import {FilterModel} from 'src/app/models/filter';

@Component({
  selector: 'app-renk-kodu',
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
  templateUrl: './renk-kodu.component.html',
  styleUrl: './renk-kodu.component.scss'
})
export class ModalRenkKoduComponent {
  displayedColumns: string[] = [
    'cmpt_rgb',
    'cl_kod',
    'cl_rpt',
    'frm_ksad',
    'cl_cl_kod2',
    'cl_sirano',
    'cl_kartela_kodu',
    'mm_ad',
    'cl_pantone',
    'cl_cog_kod',
    'cl_gelis_trh',
    'cl_gidis_trh',
    'cfyg_ad',
    'cl_yok',
    "cmpt_cift_boya_tnm IF(cmpt_rpt=1,IF(cl_boya_tur=1,'Ç','T'),IF ( cl_kod<>cl_cl_kod2,'Ç','T'))",
    'cmpt_cift_boya IF(cmpt_rpt=1,IF(cl_boya_tur=1,1,0),IF ( cl_kod<>cl_cl_kod2, 1,0))',
  ];
  columns: string[] = [
    '',
    'Kodu',
    'RPT',
    'Renk Adı',
    'Firma',
    '2.Renk Kodu',
    'Sıra No',
    'Kartela No',
    'Cinsi',
    'Pantone No',
    'Grup',
    'Grup Adı',
    'Geliş Tarihi',
    'Gidiş Tarihi',
    'Onay Tarihi',
    'Renk F.Grubu',
    'Kullanım Durumu',
    'T/Ç',
    '',
  ];
  selectedColumn: string = '';
  saveAs: string = '';
  searchText: string = '';

  dataSource: MatTableDataSource<Mamlz>;

  ngOnInit() {
    const _filterModel = new FilterModel();

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
    // if (columnName === 'compute_grop') {
    //   const mm_grp = item['mm_grp'];
    //   const cmpt_grp = item['cmpt_grp'];
    //   return item[columnName] === mm_grp + '' + cmpt_grp;
    // }

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
    public dialogRef: MatDialogRef<ModalRenkKoduComponent>,
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
