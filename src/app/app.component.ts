import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(auth: AuthService, router: Router, private userService: UserService) {
    auth.user$.subscribe(user => {
      if(!user) return;

        this.userService.save(user);

        let returnUrl = localStorage.getItem('returnUrl');
        if (! returnUrl) return;
        
        localStorage.removeItem('returnUrl');
        router.navigateByUrl(returnUrl);
      
    });
  }

}
