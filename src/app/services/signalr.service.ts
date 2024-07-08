// hub.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FilterModel } from '../models/filter';
import { Router } from '@angular/router';
import { TokenService } from './token.service';

const apiUrl = environment.apiURL;
const hubUrl = environment.hubURL;


@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  public receivedData: Subject<any> = new Subject<any>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private tokenService: TokenService,
  ) {}

  public StartJob(filter: FilterModel) {
    return this.http.post(`${apiUrl}/hub/startJob`, filter);
  }

  public KillJob(filter: FilterModel) {
    this.disconnectHub();
    return this.http.post(`${apiUrl}/hub/killjob`, filter);
  }

  public connectHub = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl)
      .build();

    this.hubConnection
      .start()
      .then()
      .catch((err) => console.log('Error while starting connection: ' + err));
  };

  public receiveData = (us_kod: string) => {
    this.offJob(us_kod);
    this.receivedData=new Subject<any>();

    this.hubConnection.on(`UserSpecificJob_${us_kod}`, (data) => {
      if (this.validateToken()) {
        this.receivedData.next(data);
      } else {
        console.error('Invalid JWT token!');
      }
    });
  };

  public offJob = (us_kod: string) => {
    this.hubConnection.off(`UserSpecificJob_${us_kod}`);
  };

  public disconnectHub = () => {
    if (this.hubConnection) {
      this.hubConnection.stop().then(() => console.log('Connection stopped'));
    }
  };

  private async validateToken(): Promise<boolean> {
    try {
      if (localStorage.getItem('cmpt_token')) {
        const response = await this.tokenService.getTokenUsKod().toPromise();

        if (response.statusCode === 200) {
          return true;
        } else if (response.statusCode === 401) {
          await this.router.navigate(['/login']);
          return false;
        } else {
          await this.router.navigate(['/login']);
          return false;
        }
      } else {
        await this.router.navigate(['/login']);
        return false;
      }
    } catch (error) {
      await this.router.navigate(['/login']);
      return false;
    }
  }
}
