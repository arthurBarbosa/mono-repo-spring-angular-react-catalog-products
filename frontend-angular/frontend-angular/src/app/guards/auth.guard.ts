import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../components/auth.service';
import { TokenService } from '../components/security/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router:Router) { }

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
    const url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean{
    if(this.tokenService.getRefreshToken){
      return true;
    }

    this.authService.redirectUrl = url;

    this.router.navigate(['/login']).then(_ => false);
    
  }
}
