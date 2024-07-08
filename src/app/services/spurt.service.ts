import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { FilterModel } from '../models/filter';
import { Spurt } from '../models/spurt';

const url = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class SpurtService {
  constructor(private http: HttpClient) {}

  public GetOrguUretim(filter: FilterModel): Observable<Spurt[]> {
    return this.http.post<Spurt[]>(`${url}/spurt/orguUretim`, filter);
  }

}
