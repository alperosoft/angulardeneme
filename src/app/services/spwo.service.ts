import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { FilterModel } from '../models/filter';
import { Spwo } from '../models/spwo';

const url = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class SpwoService {
  constructor(private http: HttpClient) {}

  public GetUretim(filter: FilterModel): Observable<Spwo[]> {
    return this.http.post<Spwo[]>(`${url}/Spwo/uretim`, filter);
  }

}
