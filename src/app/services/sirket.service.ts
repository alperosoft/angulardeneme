import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Business } from '../models/sirket';
import { environment } from 'src/environments/environment.prod';

const url = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class BusinessService {
  constructor(private http: HttpClient) {}

  public getBusinessAll(): Observable<Business[]> {
    return this.http.get<Business[]>(`${url}/sirket`);
  }
}
