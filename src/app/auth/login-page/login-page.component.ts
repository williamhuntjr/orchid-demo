import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { 
  MatSnackBar,
} from '@angular/material/snack-bar';

import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass']
})
export class LoginPageComponent implements OnInit {
  constructor(
    private authService: AuthService, 
    private fb: FormBuilder, 
    private router: Router, 
    private snackBar: MatSnackBar
  ) {}
  
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  
  public async onSubmit(): Promise<void> {
    if (this.loginForm.value.username && this.loginForm.value.password) {
      try {
        await this.authService.login(this.loginForm.value.username, this.loginForm.value.password);
      } catch (e) {
        return
      }
    }
    if (this.authService.getUsername()) {
      this.router.navigate(['/']);
      return
    }
    this.snackBar.open('Unable to login. Verify your credentials.', 'Close', {
      duration: 3000,
    });
  }

  ngOnInit(): void {
    if (this.authService.getCurrentUser()) {
      this.router.navigate(['/']);
    }
  }

}
