import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment.prod';
import {Stkf} from "../models/stkf";

const url = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class StkfService {
  constructor(private http: HttpClient) {
  }

  public getTahsilat(): Observable<any> {
    return this.http.get<any>(`${url}/Stkf/tahsilat`);
  }

  public find(srk_no: number, sf_bcmno: number, sf_no2: number, sf_fist_no: number): Observable<any> {
    return this.http.get<any>(`${url}/Stkf/find/${srk_no}/${sf_bcmno}/${sf_no2}/${sf_fist_no}`);
  }

  public next(srk_no: number, sf_bcmno: number, sf_no2: number, sf_fist_no: number): Observable<any> {
    return this.http.get<any>(`${url}/Stkf/next/${srk_no}/${sf_bcmno}/${sf_no2}/${sf_fist_no}`);
  }

  public previous(srk_no: number, sf_bcmno: number, sf_no2: number, sf_fist_no: number): Observable<any> {
    return this.http.get<any>(`${url}/Stkf/previous/${srk_no}/${sf_bcmno}/${sf_no2}/${sf_fist_no}`);
  }

  public save(stkf: Stkf): Observable<any> {
    return this.http.post<any>(`${url}/Stkf`, stkf);
  }

  public update(stkf: Stkf): Observable<any> {
    return this.http.put<any>(`${url}/Stkf`, stkf);
  }

  public delete(sf_primno: number): Observable<any> {
    return this.http.delete<any>(`${url}/Stkf/${sf_primno}`);
  }
}
