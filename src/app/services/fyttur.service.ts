import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment.prod';
import {Fyttur} from '../models/fytur';

const url = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class FytturService {
  constructor(private http: HttpClient) {
  }

  public getFyttur(): Observable<Fyttur[]> {
    return this.http.get<Fyttur[]>(`${url}/Fyttur`);
  }
}
