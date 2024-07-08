import { Injectable } from '@angular/core';
import { RecordArchive } from '../models/kytarsiv';
import { FormatDateMethod } from './format-date.method';
import { jwtDecode } from 'jwt-decode';
import { FilterModel } from '../models/filter';
import { SignalRService } from '../services/signalr.service';

@Injectable({
  providedIn: 'root',
})
export class KillJobMethod {
  constructor(
    private formatDate: FormatDateMethod,
    private signalRService: SignalRService,
  ) {}

  us_kod: string;
  filterValues: FilterModel = {};

  killJob(): any {
    const decodedToken = jwtDecode(localStorage.getItem('cmpt_token')); // =
    this.us_kod =
      decodedToken[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
      ];
    this.filterValues.filterValue22 = `UserSpecificJob_${this.us_kod}`;
    this.signalRService.KillJob(this.filterValues).subscribe(
      (response) => {
        return true;
      },
      (error) => {
        console.log(`erorr while killing job UserSpecificJob_${this.us_kod}`);
        return `erorr while killing job UserSpecificJob_${this.us_kod}`;
      },
    );
  }
}
