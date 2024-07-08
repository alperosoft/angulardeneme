import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment.prod';

const url = environment.apiURL;

@Injectable({providedIn: 'root'})
export class StokPrtService {
  constructor(private httpClient: HttpClient) {
  }

  public getStokPrtTotalSum(
    srk_no: number,
    bcmno: number,
    yil: number,
    dp_no: number,
    mm_primno: number,
    cl_primno: number,
    birim: string,
  ): Observable<string> {
    return this.httpClient.get<string>(
      `${url}/stokprt/totalsum/${srk_no}/${bcmno}/${yil}/${dp_no}/${mm_primno}/${cl_primno}/${birim}`,
    );
  }

  public getMaliyet(
    srk_no: number,
    bcmno: number,
    yil: number,
    dp_no: number
  ): Observable<string> {
    return this.httpClient.get<string>(
      `${url}/stokprt/maliyet/${srk_no}/${bcmno}/${yil}/${dp_no}`,
    );
  }
}
