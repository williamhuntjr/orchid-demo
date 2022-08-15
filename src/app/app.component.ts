import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) { }
  
  ngOnInit(): void {
    this.authService.checkToken();

    if (!this.authService.getCurrentUser()) {
      this.router.navigate(['/login']);
    }
  }
}
