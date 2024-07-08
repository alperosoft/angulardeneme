import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Firmadr} from '../models/firmadr';
import {environment} from 'src/environments/environment.prod';

const url = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class FirmadrService {
  constructor(private http: HttpClient) {
  }

  public getFirmadr(frm_kod): Observable<Firmadr[]> {
    return this.http.get<Firmadr[]>(
      `${url}/Firma/firmadr?srk_no=${localStorage.getItem(
        'srk_no',
      )}&frm_kod=${frm_kod}`,
    );
  }
}
