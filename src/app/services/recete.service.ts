import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { FilterModel } from '../models/filter';
import { Recete } from '../models/recete';

const url = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class ReceteService {
  constructor(private http: HttpClient) {}

  public GetRecete(filter: FilterModel): Observable<Recete[]> {
    return this.http.post<Recete[]>(`${url}/recete`, filter);
  }

}
