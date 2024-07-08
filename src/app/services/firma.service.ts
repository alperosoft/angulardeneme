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

  public getSirket(): Observable<Firma[]> {
    return this.http.get<Firma[]>(
      `${url}/Firma?srk_no=${localStorage.getItem(
        'srk_no',
      )}&ktgr_kod=MUS&frm_tur=0`,
    );
  }
}
