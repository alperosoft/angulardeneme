import {Component, Inject, OnInit} from '@angular/core';
import {AsyncPipe, CommonModule, DatePipe} from '@angular/common';
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
import {FormControl, FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {Firma} from 'src/app/models/firma';
import {ModalFirmaComponent} from '../../firma/firma.component';
import {ModalProfilComponent} from '../table/profil-no/profil-no.component';
import {DemoMaterialModule} from 'src/app/demo-material-module';
import {NgScrollbarModule} from 'ngx-scrollbar';
import {Observable, forkJoin, map, startWith} from 'rxjs';
import {ColorsService} from 'src/app/services/colors.service';
import {ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {formatDate} from 'src/app/utils/formattedDate';

interface Select {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-filter',
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
    MatDialogModule,
    DemoMaterialModule,
    NgScrollbarModule,
    MatOptionModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    AsyncPipe,],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class ModalFisnoFilterComponent implements OnInit {
  selectedColumn: string = '';
  saveAs: string = '';
  searchText: string = '';
  dataSource: MatTableDataSource<Firma>;

  myControl = new FormControl('');
  options: string[] = [];
  filteredOptions: Observable<string[]>;
  filterData: {} = {};

  filterValues = {
    srk_no: Number(localStorage.getItem('srk_no')),
    bcmno: 150,
    frm_kod_i: '',
    frm_kod_s: '',
    yil_i: new Date().getFullYear() - 1,
    yil_s: new Date().getFullYear(),
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
    sptrh_i: this.datePipe.transform(`01-01-${new Date().getFullYear()-1}`, "dd-MM-yyyy"),
    sptrh_s: this.datePipe.transform(new Date(), "dd-MM-yyyy"),
    as_kod_i: '',
    as_kod_s: '',
  };

  constructor(
    public dialog: MatDialog,
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<ModalFisnoFilterComponent>,
    private colorService: ColorsService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    //this.saveAs = data.saveAs;
  }

  ngOnInit() {
    // const filterValuesString = sessionStorage.getItem('filterModal');
    //
    // if (filterValuesString) {
    //   this.filterValues = JSON.parse(filterValuesString);
    // }
    //
    // forkJoin([this.colorService.getColor(406, 0)]).subscribe(
    //   (responses: any[]) => {
    //     this.options.push(...responses[0].data.map((res: any) => res.cl_kod));
    //   },
    // );
    //
    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map((value) => this._filter(value || '')),
    // );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue),
    );
  }

  onInputChange() {
    sessionStorage.setItem('filterModal', JSON.stringify(this.filterValues));
  }

  onCloseAndFilter() {
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

      sessionStorage.setItem('filterModal', JSON.stringify(this.filterValues));
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
      sessionStorage.setItem('filterModal', JSON.stringify(this.filterValues));
    });
  }
}

