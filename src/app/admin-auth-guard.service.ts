import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import 'rxjs/add/operator/switchMap';
import { AppUser } from './models/app-user';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  
  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate() {
    return this.auth.
      user$.
        switchMap( (user) => { return this.userService.get(user.uid)})
          .map( (x: AppUser) => x.isAdmin);
  }

}
