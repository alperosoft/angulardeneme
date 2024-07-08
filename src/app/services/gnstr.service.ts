import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment.prod';
import {Gnstr} from '../models/gnstr';

const url = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class GnstrService {
  constructor(private http: HttpClient) {
  }

  public getGnstr(): Observable<Gnstr[]> {
    return this.http.get<Gnstr[]>(
      `${url}/Gnstr/${localStorage.getItem('srk_no')}/655`,
    );
  }

  public getGnstr2(): Observable<Gnstr[]> {
    return this.http.get<Gnstr[]>(
      `${url}/Gnstr/${localStorage.getItem('srk_no')}/151`,
    );
  }

  public getGnstr3(gs_primno): Observable<Gnstr[]> {
    return this.http.get<Gnstr[]>(
      `${url}/Gnstr/gnstr/${localStorage.getItem('srk_no')}/${gs_primno}`,
    );
  }
}
