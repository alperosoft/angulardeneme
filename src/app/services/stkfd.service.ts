import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { FilterModel } from '../models/filter';
import { Stkfd } from '../models/stkfd';

const url = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class StkfdService {
  constructor(private http: HttpClient) {}

  public GetGelenUrun(filter: FilterModel): Observable<Stkfd[]> {
    return this.http.post<Stkfd[]>(`${url}/stkfd/gelenurun`, filter);
  }

  public GetSatisUrun(filter: FilterModel): Observable<Stkfd[]> {
    return this.http.post<Stkfd[]>(`${url}/stkfd/satisurun`, filter);
  }
}
