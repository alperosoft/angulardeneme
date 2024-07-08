import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Doviz } from '../models/doviz';

const url = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class DovizService {
  constructor(private http: HttpClient) {}

  public getDoviz(): Observable<Doviz[]> {
    return this.http.get<Doviz[]>(`${url}/Doviz`);
  }
}
