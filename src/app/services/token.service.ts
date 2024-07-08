import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

const apiURL = environment.apiURL

@Injectable({providedIn: 'root'})
export class TokenService {
    constructor(private httpClient: HttpClient) { }

    public getTokenUsKod(): Observable<any> {
        return this.httpClient.get<any>(`${apiURL}/user/tokenclaims`)
    }
}