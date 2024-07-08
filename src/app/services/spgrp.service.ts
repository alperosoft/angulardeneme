import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment.prod';
import {Sp, Spgrp} from '../models/sp';

const url = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class SpgrpService {
  constructor(private http: HttpClient) {
  }

  public getSpgrp(): Observable<Spgrp[]> {
    return this.http.get<Spgrp[]>(
      `${url}/Sp/grp?srk_no=${localStorage.getItem('srk_no')}&bcmno=150`,
    );
  }
}
