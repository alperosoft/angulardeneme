import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment.prod';
import {Isletme} from '../models/isletme';

const url = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class IsletmeService {
  constructor(private http: HttpClient) {
  }

  public getIsletme(): Observable<Isletme[]> {
    return this.http.get<Isletme[]>(`${url}/Isletme`);
  }
}
