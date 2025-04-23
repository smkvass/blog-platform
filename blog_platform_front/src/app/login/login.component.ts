import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        this.authService.saveToken(response.token); // assuming response has { token: "..." }
        this.router.navigate(['/posts']);
      },
      error: (err) => {
        this.error = 'Неверный email или пароль';
      }
    });
  }
}
