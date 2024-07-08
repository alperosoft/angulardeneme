import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Lb} from '../models/lb';
import {environment} from 'src/environments/environment.prod';

const url = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class LbService {
  constructor(private http: HttpClient) {
  }

  public getLb(): Observable<Lb[]> {
    return this.http.get<Lb[]>(
      `${url}/Lb?srk_no=${Number(localStorage.getItem('srk_no'))}`,
    );
  }
}
