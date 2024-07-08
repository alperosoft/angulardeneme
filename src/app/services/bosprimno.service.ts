import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

const url = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class BosPrimNoService {
  constructor(private http: HttpClient) {}

  public getBosPrimNo(bos_tablo:string,bos_srk_no:number,  bos_bcmno:number): Observable<any> {
    return this.http.get<any>(`${url}/Bosprimno/${bos_tablo}/${bos_srk_no}/${bos_bcmno}`);
  }
}
