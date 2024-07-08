import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { FilterModel } from '../models/filter';
import { Sevkiyat } from '../models/sevkiyat';

const url = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class SevkiyatService {
  constructor(private http: HttpClient) {}

  public GetSevkiyat(filter: FilterModel): Observable<Sevkiyat[]> {
    return this.http.post<Sevkiyat[]>(`${url}/sevkiyat`, filter);
  }

}
