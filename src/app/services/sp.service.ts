import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment.prod';
import {Sp, Spgrp} from '../models/sp';

const url = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class SpService {
  constructor(private http: HttpClient) {
  }

  public getSp(frm_kod): Observable<Sp[]> {
    return this.http.get<Sp[]>(
      `${url}/Sp/proje?srk_no=${localStorage.getItem(
        'srk_no',
      )}&frm_kod=${frm_kod}`,
    );
  }

  public getSpSp(no1: number, no2: number): Observable<any> {
    return this.http.get<any>(
      `${url}/Sp/sp?srk_no=${localStorage.getItem(
        'srk_no',
      )}&bcmno=150&no1=${no1}&no2=${no2}`,
    );
  }

  public getSpgrp(): Observable<Spgrp[]> {
    return this.http.get<Spgrp[]>(
      `${url}/Sp/grp?srk_no=${localStorage.getItem('srk_no')}&bcmno=150`,
    );
  }

  public next(srk_no: number, sp_bcmno: number, sp_no2: number, sp_no1: number): Observable<any> {
    return this.http.get<any>(`${url}/sp/next/${srk_no}/${sp_bcmno}/${sp_no2}/${sp_no1}`);
  }

  public previous(srk_no: number, sp_bcmno: number, sp_no2: number, sp_no1: number): Observable<any> {
    return this.http.get<any>(`${url}/sp/previous/${srk_no}/${sp_bcmno}/${sp_no2}/${sp_no1}`);
  }

  public InsertSp(sp: Sp): Observable<any> {
    return this.http.post<any>(`${url}/sp/insertsp`, sp);
  }

  public updateSp(sp: object): Observable<any> {
    return this.http.put<any>(`${url}/Sp/updatesp`, sp);
  }

  public delete(sp_primno: number): Observable<any> {
    return this.http.delete<any>(`${url}/Sp/${sp_primno}`);
  }
}
