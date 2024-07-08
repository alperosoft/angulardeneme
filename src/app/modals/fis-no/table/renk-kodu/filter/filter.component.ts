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
import {Firma} from 'src/app/models/firma';
import {ModalFirmaComponent} from 'src/app/modals/firma/firma.component';
import {ModalProfilComponent} from '../../profil-no/profil-no.component';
import {formatDate} from 'src/app/utils/formattedDate';

interface Select {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-filter',
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
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class ModalFisnoFilterComponent {
  selectedColumn: string = '';
  saveAs: string = '';
  searchText: string = '';

  dataSource: MatTableDataSource<Firma>;

  ngOnInit() {
    const filterValuesString = sessionStorage.getItem('filterModal');

    if (filterValuesString) {
      this.filterValues = JSON.parse(filterValuesString);
    }
  }

  filterValues = {
    srk_no: Number(localStorage.getItem('srk_no')),
    bcmno: 150,
    frm_kod_i: '',
    frm_kod_s: '',
    yil_i: '',
    yil_s: '',
    sipno_i: 0,
    sipno_s: 0,
    mm_kod_i: '',
    mm_kod_s: '',
    urun_tipi: '',
    cl_kod_i: '',
    cl_kod_s: '',
    id_i: 0,
    id_s: 0,
    bitis: '',
    sptrh_i: formatDate(new Date(new Date().getFullYear() - 1, 0, 1)),
    sptrh_s: formatDate(new Date(new Date().getFullYear(), 11, 31)),
    as_kod_i: '',
    as_kod_s: '',
  };

  onInputChange() {
    sessionStorage.setItem('filterModal', JSON.stringify(this.filterValues));
  }

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<ModalFisnoFilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.saveAs = data.saveAs;
  }

  onClose() {
    this.dialogRef.close();
  }

  urunTipiOptions: Select[] = [
    {value: 'PR', viewValue: 'Pres'},
    {value: 'BY', viewValue: 'Boya'},
    {value: 'EL', viewValue: 'Eloksal'},
    {value: 'T', viewValue: 'Tümü'},
  ];

  durumuOptions: Select[] = [
    {value: 'A', viewValue: 'Devam Edenler'},
    {value: 'K', viewValue: 'Bitenler'},
    {value: 'T', viewValue: 'Tümü'},
    {value: '', viewValue: ''},
  ];

  onClear() {
    sessionStorage.clear();
  }

  openFirmaModal(name: string): void {
    const dialogRef = this.dialog.open(ModalFirmaComponent, {
      backdropClass: 'custom-backdrop',
      width: '40%',
    });

    dialogRef.backdropClick().subscribe(() => {
      dialogRef.close('');
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (name === 'ilk') {
        this.filterValues.frm_kod_i = result.frm_kod;
      } else {
        this.filterValues.frm_kod_s = result.frm_kod;
      }
    });
  }

  openProfilModal(name: string): void {
    const dialogRef = this.dialog.open(ModalProfilComponent, {
      backdropClass: 'custom-backdrop',
      width: '70%',
    });

    dialogRef.backdropClick().subscribe(() => {
      dialogRef.close('');
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (name === 'ilk') {
        this.filterValues.mm_kod_i = result.mm_kod;
      } else {
        this.filterValues.mm_kod_s = result.mm_kod;
      }
    });
  }
}
