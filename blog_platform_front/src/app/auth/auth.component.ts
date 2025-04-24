// src/app/components/auth/auth.component.ts
import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  email: string = '';
  password: string = '';
  name: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    if (!this.email || !this.password || !this.name) {
      this.errorMessage = 'Please fill out all fields';
      return;
    }

    const data = {
      email: this.email,
      password: this.password,
      name: this.name
    };

    this.authService.register(data).subscribe(
      response => {
        alert('Registration successful');
        this.router.navigate(['/login']); // Перенаправление на страницу входа
      },
      error => {
        this.errorMessage = error.error.detail || 'An error occurred during registration';
      }
    );
  }

  onLogin() {
    // Убедись, что все данные передаются правильно
    if (!this.email || !this.password) {
      this.errorMessage = 'Please provide both email and password';
      return;
    }

    const data = {
      email: this.email,
      password: this.password
    };

    this.authService.login(data.email, data.password).subscribe(
      response => {
        // Сохранение токена или других данных пользователя в localStorage или cookies
        localStorage.setItem('token', response.token);
        this.router.navigate(['/home']); // Перенаправление на домашнюю страницу
      },
      error => {
        this.errorMessage = error.error.detail || 'Invalid credentials';
      }
    );
  }
}
