import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-logout-page',
  templateUrl: './logout-page.component.html',
  styleUrls: ['./logout-page.component.sass']
})
export class LogoutPageComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.clearUser();
    this.router.navigate(['/login']);
  }
}
