import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from 'src/environments/environment.prod';
import {catchError, map, of} from "rxjs";

const url = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class tableIdService {
  constructor(private http: HttpClient) {
  }

  public getTableId(srk_no: number, bcmno: number, yil: number, table_name: string, kategori?: string, f_set?: string) {

    let params = new HttpParams()
      .set('kategori', kategori || '')
      .set('f_set', f_set || '');

    return this.http.get<any>(`${url}/TableId/${srk_no}/${bcmno}/${yil}/${table_name}`, { params }).pipe(
      map((response: any) => response),
      catchError((error) => {
        console.warn(error);
        return of(null);
      })
    );
    //return this.http.get(`${url}/TableId/${srk_no}/${bcmno}/${yil}/${table_name}?kategori=${kategori}&f_set=${f_set}`);
  }

  //düzeltilecek
  public getSpdNo1(spd_no1: number) {
    return this.http.get(`${url}/TableId/getspdno2/${spd_no1}`);
  }

}
