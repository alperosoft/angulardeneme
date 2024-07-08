import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment.prod';
import {Ebat} from '../models/ebat';

const url = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class EbatService {
  constructor(private http: HttpClient) {
  }

  public getEbat(): Observable<Ebat[]> {
    return this.http.get<Ebat[]>(
      `${url}/Ebat?srk_no=${localStorage.getItem('srk_no')}`,
    );
  }
}
