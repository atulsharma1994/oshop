import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { AppUser } from './models/app-user';

@Injectable()
export class AdminAuthGuard implements CanActivate {
  
  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate() {
    return this.auth.appUser$
          .map( (x: AppUser) => x.isAdmin);
  }

}
