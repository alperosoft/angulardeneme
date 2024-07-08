import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment.prod';
import {Stkfdtop} from "../models/stkfdtop";

const url = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class StkfTopService {
  constructor(private http: HttpClient) {
  }
  public find(srk_no: number, sfd_bcmno: number, sfd_sf_primno: number): Observable<any> {
    return this.http.get<any>(`${url}/Stkfdtop/find/${srk_no}/${sfd_bcmno}/${sfd_sf_primno}`);
  }
  public save(stkftop: Stkfdtop): Observable<any> {
    return this.http.post<number>(`${url}/Stkfdtop`, stkftop);
  }
  public update(stkftop: Stkfdtop): Observable<any> {
    return this.http.put<number>(`${url}/Stkfdtop`, stkftop);
  }
  public delete(sfd_primno: number): Observable<any> {
    return this.http.delete<any>(`${url}/Stkfdtop/delete/${sfd_primno}`);
  }
  public deleteAll(sf_primno: number): Observable<any> {
    return this.http.delete<any>(`${url}/Stkfdtop/delete-all/${sf_primno}`);
  }
}
