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
import {Firma} from 'src/app/models/firma';
import {FirmaDistService} from 'src/app/services/firmadist.service';

@Component({
  selector: 'app-firmadist',
  standalone: true,
  imports: [CommonModule, MatButtonModule,
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
  templateUrl: './firmadist.component.html',
  styleUrl: './firmadist.component.scss'
})
export class ModalFirmaDistComponent {
  displayedColumns: string[] = ['frmd_kod', 'frmd_ad'];
  columns: string[] = ['Dist.Firma Kodu', 'Adı'];
  selectedColumn: string = '';
  saveAs: string = '';
  searchText: string = '';

  dataSource: MatTableDataSource<Firma>;

  constructor(
    public dialogRef: MatDialogRef<ModalFirmaDistComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private firmaService: FirmaDistService,
  ) {
    this.saveAs = data.saveAs;
  }

  ngOnInit() {
    this.firmaService.getDistFirma().subscribe(
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

  onClose(): void {
    this.dialogRef.close();
  }

  onAdd(): void {
    this.dialogRef.close(this.selectedColumn);
  }
}
