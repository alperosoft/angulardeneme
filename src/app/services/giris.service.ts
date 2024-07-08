import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { FilterModel } from '../models/filter';

const url = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  public postLogin(filter: FilterModel): Observable<any> {
    return this.http.post<any>(`${url}/user/login`, filter);
  }
}
