import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Firmagrp} from '../models/firmagrp';
import {environment} from 'src/environments/environment.prod';

const url = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class FirmagrpService {
  constructor(private http: HttpClient) {
  }

  public getFirmagrp(): Observable<Firmagrp[]> {
    return this.http.get<Firmagrp[]>(
      `${url}/Firmagrp/${localStorage.getItem('srk_no')}`,
    );
  }
}
