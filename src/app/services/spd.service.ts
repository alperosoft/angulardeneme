import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment.prod';
import {Spd} from '../models/spd';

const url = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class SpdService {
  constructor(private http: HttpClient) {
  }

  public save(spd: any): Observable<number> {
    return this.http.post<number>(`${url}/spd/insertspd`, spd);
  }

  public spdSiparisler(filterModel: object): Observable<Spd[]> {
    return this.http.post<Spd[]>(`${url}/spd/spd`, filterModel);
  }

  public spdTotalSum(
    srk_no: number,
    mm_primno: number,
    cl_primno: number,
  ): Observable<string> {
    return this.http.get<string>(
      `${url}/spd/spdtotalsum/${srk_no}/${mm_primno}/${cl_primno}`,
    );
  }

  public spdFilter(filters): Observable<Spd[]> {
    return this.http.post<Spd[]>(`${url}/Spd/filter`, filters);
  }

  public updateSpd(spd: Spd): Observable<any> {
    return this.http.put<any>(`${url}/Spd/updatespd`, spd);
  }
}
