import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment.prod';
import {FilterModel} from '../models/filter';
import {Colors} from '../models/colors';

const url = environment.apiURL;

@Injectable({
  providedIn: 'root',
})
export class ColorsService {
  constructor(private http: HttpClient) {
  }

  public GetGelenRenk(filter: FilterModel): Observable<Colors[]> {
    return this.http.post<Colors[]>(`${url}/colors/gelenrenk`, filter);
  }

  public GetOnayRenk(filter: FilterModel): Observable<Colors[]> {
    return this.http.post<Colors[]>(`${url}/colors/onayrenk`, filter);
  }

  public getColors(bcmno): Observable<Colors[]> {
    return this.http.get<Colors[]>(
      `${url}/Colors?srk_no=${localStorage.getItem('srk_no')}&bcmno=${bcmno}`,
    );
  }

  public getColor(bcmno, tur): Observable<Colors[]> {
    return this.http.get<Colors[]>(
      `${url}/Colors/color?srk_no=${localStorage.getItem(
        'srk_no',
      )}&bcmno=${bcmno}&tur=${tur}`,
    );
  }

  public color(cl_primno): Observable<Colors[]> {
    return this.http.get<Colors[]>(
      `${url}/Colors/getcolor?srk_no=${localStorage.getItem(
        'srk_no',
      )}&cl_primno=${cl_primno}`,
    );
  }

  public getColorsYardim(filter: FilterModel): Observable<Colors[]> {
    return this.http.post<Colors[]>(`${url}/Colors`, filter);
  }

}
