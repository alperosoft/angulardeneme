import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment.prod';
import {Lfyd} from '../models/lfyd';

const url = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class LfydService {
  constructor(private http: HttpClient) {
  }

  public getLfyd(frm_kod?: string, kod1?: string): Observable<Lfyd[]> {
    return this.http.get<Lfyd[]>(
      `${url}/Lfyd?srk_no=${localStorage.getItem('srk_no')}${
        (frm_kod && '&frm_kod=' + frm_kod) || ''
      }${
        (kod1 && '&kod1=' + kod1) || ''
      }`,
    );
  }
}
