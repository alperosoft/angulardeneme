import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Personel} from '../models/personel';
import {environment} from 'src/environments/environment.prod';

const url = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class PersonelService {
  constructor(private http: HttpClient) {
  }

  public getPersonel(): Observable<Personel[]> {
    return this.http.get<Personel[]>(`${url}/Personel`);
  }
}
