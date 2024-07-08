import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FilterModel} from '../models/filter';
import {Observable, filter} from 'rxjs';
import {MenuItem} from '../models/menunew';
import {environment} from 'src/environments/environment';

const apiURL = environment.apiURL

@Injectable({providedIn: 'root'})
export class MenuService {
  constructor(private httpClient: HttpClient) {
  }

  public getMenu(filter: FilterModel): Observable<MenuItem[]> {
    return this.httpClient.post<MenuItem[]>(`${apiURL}/menu`, filter)
  }

  public getYetkilendirme(): Observable<any> {
    return this.httpClient.get<any>(`${apiURL}/menu`)
  }
}
