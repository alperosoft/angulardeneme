import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment.prod';

const url = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class RaporService {
  constructor(private http: HttpClient) {
  }

  public queryExecute(raporID: any, whereValues: any): Observable<any> {
    const encodedWhereValues = encodeURIComponent(whereValues);
    return this.http.get<any>(`${url}/QueryExecute/${raporID}/${encodedWhereValues}`);
  }

  public getFilter(raporID: any): Observable<any> {
    return this.http.get<any>(`${url}/QueryExecute/pagefilter/${raporID}`);
  }
}
