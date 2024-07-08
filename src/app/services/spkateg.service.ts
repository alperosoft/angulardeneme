import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Spkateg} from '../models/spkateg';
import {environment} from 'src/environments/environment.prod';

const url = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class SpkategService {
  constructor(private http: HttpClient) {
  }

  public getSpkateg(): Observable<Spkateg[]> {
    return this.http.get<Spkateg[]>(
      `${url}/Spkateg?srk_no=${Number(localStorage.getItem('srk_no'))}`,
    );
  }
}
