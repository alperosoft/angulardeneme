import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Birim } from '../models/birim';

const url = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class BirimService {
  constructor(private http: HttpClient) {}

  public getBirim(): Observable<Birim[]> {
    return this.http.get<Birim[]>(`${url}/Birim`);
  }
}
