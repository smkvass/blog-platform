import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls:['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';
  isLogin = true;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.errorMessage = '';
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        this.authService.saveTokens(response.access, response.refresh);
        this.authService.setUserName(response.name); 
        this.router.navigate(['/posts']);
      },
      error: (error) => {
        console.error("Login failed, error:", error);
        this.errorMessage = "We don't have such account";
      }
    });
    
  }
  

  signUp() {
    this.authService.register({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        alert('Your registration is successful!');
        this.authService.saveTokens(response.token, response.refresh);
        this.router.navigate(['/posts']);
      },
      error: (error) => {
        if (error.error?.error === 'User already exists') {
          alert('You have already registered!');
        } else {
          alert('Registration failed!');
        }
      }
    });
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
  toggleForm() {
    this.errorMessage = '';
    this.isLogin = !this.isLogin;
  }
}
