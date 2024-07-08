import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment.prod';
import {Mamlz} from '../models/mamlz';
import {FilterModel} from '../models/filter';

const apiURL = environment.apiURL;

@Injectable({providedIn: 'root'})
export class MamlzService {
  constructor(private httpClient: HttpClient) {
  }


  public getAll(srk_no: number): Observable<any> {
    return this.httpClient.get<any>(`${apiURL}/mamlz/get-all/${srk_no}`);
  }

  public getRofMamlz(mm_primno: number, param: string): Observable<Mamlz> {
    return this.httpClient.get<Mamlz>(`${apiURL}/mamlz/${param}/${mm_primno}`);
  }

  public getMamlzYardim(filter: FilterModel): Observable<Mamlz[]> {
    return this.httpClient.post<Mamlz[]>(`${apiURL}/mamlz`, filter);
  }

  public getMamlz(
    an_srk_no: number,
    an_tur: number,
    as_left_kod: string,
    as_kod_i: string,
    as_kod_s: string,
  ): Observable<Mamlz[]> {
    return this.httpClient.get<Mamlz[]>(
      `${apiURL}/mamlz?an_srk_no=${an_srk_no}&an_tur=${an_tur}&as_left_kod=${as_left_kod}&as_kod_i=${as_kod_i}&as_kod_s=${as_kod_s}`,
    );
  }
}
