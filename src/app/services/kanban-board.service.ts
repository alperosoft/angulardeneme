import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment.prod';

const url = environment.apiURL;

const us_kod = localStorage.getItem('kullanici_adi');
const srk_no = localStorage.getItem('srk_no');

@Injectable({
  providedIn: 'root',
})

export class KanbanBoardService {
  constructor(private http: HttpClient) {
  }

  public get(): Observable<any> {
    return this.http.get<any>(`${url}/kanbanboard/${us_kod}`);
  }

  public save(kanbanboard: any): Observable<any> {
    return this.http.post<any>(`${url}/kanbanboard`, kanbanboard);
  }

  public delete(kartID: any): Observable<any> {
    return this.http.delete<any>(`${url}/kanbanboard/${kartID}`);
  }

  public deleteAll(): Observable<any> {
    return this.http.delete<any>(`${url}/kanbanboard/${srk_no}/${us_kod}`);
  }
}
