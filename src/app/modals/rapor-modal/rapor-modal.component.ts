import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDialogRef} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {FilterModel} from "../../models/filter";
import {DemoMaterialModule} from "../../demo-material-module"
import {ToastrService} from 'ngx-toastr';
import {jwtDecode} from 'jwt-decode';
import {SignalRService} from '../../services/signalr.service';

@Component({
  selector: 'app-rapor-modal',
  standalone: true,
  imports: [CommonModule, DemoMaterialModule, FormsModule],
  templateUrl: './rapor-modal.component.html',
  styleUrl: './rapor-modal.component.scss'
})
export class RaporModalComponent {

  saveAs: string = '';
  modalValuesObject: any;
  oldFilterValues: FilterModel = {};
  us_kod: string = "";

  constructor(
    private signalRService: SignalRService,
    private dialogRef: MatDialogRef<RaporModalComponent>,
    private toastr: ToastrService,
  ) {
  }

  filterValues: FilterModel = {
    filterValue1: Number(localStorage.getItem('srk_no')),
    filterValue2: 2023,
    filterValue3: 5,
    filterValue4: 11,
    filterValue5: 45,
    filterValue20: '',
    filterValue21: this.us_kod,
    filterValue60: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate() - 1,
    ),
    filterValue61: new Date(),
  };

  ngOnInit(): void {

    const decodedToken = jwtDecode(localStorage.getItem('cmpt_token')); // =
    this.us_kod =
      decodedToken[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
        ];
    this.filterValues.filterValue21 = this.us_kod

  }

  onClose() {
    if (!this.filterValues.filterValue60 || !this.filterValues.filterValue61) {
      this.toastr.error('Tarih boş olamaz!');
      return;
    }

    this.dialogRef.close(this.filterValues);
  }

  onClear() {
    this.filterValues.filterValue60 = null;
    this.filterValues.filterValue61 = null;
  }
}
