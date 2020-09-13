import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route, state: RouterStateSnapshot) {
    return this.auth.user$.map(user => {
      if(user) return true;

      let returnUrl = state.url;
      this.router.navigate(['/login'], { queryParams: {returnUrl: returnUrl}});
      return false;
    });
  }

}
