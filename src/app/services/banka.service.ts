import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Banka} from '../models/banka';
import {environment} from 'src/environments/environment.prod';

const url = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class BankaService {
  constructor(private http: HttpClient) {
  }

  public getBanka(): Observable<Banka[]> {
    return this.http.get<Banka[]>(
      `${url}/Banka/${localStorage.getItem('srk_no')}`,
    );
  }
}
