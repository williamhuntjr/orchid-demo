import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
})
export class HeaderComponent implements OnInit {  
  currentUser: string|null

  constructor(private authService: AuthService, private router: Router) {
    this.currentUser = '';

    router.events.subscribe(val => {
      if (val && val.constructor.name == 'NavigationEnd') {
        this.currentUser = this.authService.getUsername();
      }
    })
  }
  
  ngOnInit(): void {
    this.currentUser = this.authService.getUsername();
  }
}
