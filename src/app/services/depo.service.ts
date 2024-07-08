import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment.prod';
import {Depo} from "../models/depo";

const url = environment.apiURL;
const srk_no = localStorage.getItem('srk_no');

@Injectable({
  providedIn: 'root',
})
export class DepoService {
  constructor(private http: HttpClient) {
  }

  public getDepo(): Observable<any> {
    return this.http.get<any>(`${url}/Depo/${srk_no}`);
  }
}
