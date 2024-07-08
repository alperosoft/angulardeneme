import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FirmaDist} from '../models/firmadist';
import {environment} from 'src/environments/environment.prod';

const url = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class FirmaDistService {
  constructor(private http: HttpClient) {
  }

  public getDistFirma(): Observable<FirmaDist[]> {
    return this.http.get<FirmaDist[]>(
      `${url}/Firma/firmadist?srk_no=${localStorage.getItem('srk_no')}`,
    );
  }

  public getFirmaDist(frmd_kod): Observable<FirmaDist[]> {
    return this.http.get<FirmaDist[]>(
      `${url}/Firma/firmadist/${localStorage.getItem('srk_no')}/'${frmd_kod}'`,
    );
  }
}
