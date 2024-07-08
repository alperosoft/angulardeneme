import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { TokenService } from './services/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
    constructor(
      private router: Router,
      private tokenService: TokenService,
    ) {}

    async canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot,
    ): Promise<boolean> {
      try {
        if(localStorage.getItem("cmpt_token")){
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
        }else{
          await this.router.navigate(['/login']);
          return false;
        }

      } catch (error) {
        await this.router.navigate(['/login']);
        return false;
      }
    }
}
