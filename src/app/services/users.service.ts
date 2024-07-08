import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment.prod';
import {Vardiya} from "../models/vardiya";

const url = environment.apiURL;
const srk_no = localStorage.getItem('srk_no');

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  public getUsers(): Observable<any> {
    return this.http.get<any>(`${url}/User/${srk_no}`);
  }
}
