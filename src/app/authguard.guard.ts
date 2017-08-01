import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {LoginService} from './login-service.service';


@Injectable()
export class AuthguardGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean{
      if(!this.loginService.loggedIn()){
        this.router.navigate(['login']);
      }

      return true;
      
    }

}
