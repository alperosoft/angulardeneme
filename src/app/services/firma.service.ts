import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Firma} from '../models/firma';
import {environment} from 'src/environments/environment.prod';

const url = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class FirmaService {
  constructor(private http: HttpClient) {
  }

  public getFirma(frm_kod: string): Observable<Firma[]> {
    return this.http.get<Firma[]>(
      `${url}/Firma/firma?srk_no=${localStorage.getItem(
        'srk_no',
      )}&frm_kod=${frm_kod}`,
    );
  }

  public getSirket(ktgr_kod?: string): Observable<Firma[]> {
    console.warn();
    return this.http.get<Firma[]>(
      `${url}/Firma?srk_no=${localStorage.getItem(
        'srk_no',
      )}${ktgr_kod ? `&ktgr_kod=${ktgr_kod}` : ""}&frm_tur=0`,
    );
  }

  public get(): Observable<Firma[]> {
    return this.http.get<Firma[]>(
      `${url}/Firma?srk_no=${localStorage.getItem('srk_no')}&frm_tur=0`,
    );
  }


  public next(frm_kod: string): Observable<any> {
    return this.http.get<any>(`${url}/Firma/next/${localStorage.getItem('srk_no')}/${frm_kod}`);
  }

  public previous(frm_kod: string): Observable<any> {
    return this.http.get<any>(`${url}/Firma/previous/${localStorage.getItem('srk_no')}/${frm_kod}`);
  }

  public post(firma: Firma) {
    return this.http.post<Firma[]>(
      `${url}/Firma`, firma
    );
  }

  public put(firma: Firma) {
    return this.http.put<Firma>(
      `${url}/Firma`, firma
    );
  }

  public delete(frm_kod: string) {
    return this.http.delete<Firma[]>(
      `${url}/Firma/${localStorage.getItem('srk_no')}/${frm_kod}`);
  }
}
