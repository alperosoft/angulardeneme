import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment.prod';
import {Ambalaj} from '../models/ambalaj';

const url = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class AmbalajService {
  constructor(private http: HttpClient) {
  }

  public getAmbalaj(): Observable<Ambalaj[]> {
    return this.http.get<Ambalaj[]>(
      `${url}/Ambalaj?srk_no=${localStorage.getItem('srk_no')}`,
    );
  }
}
