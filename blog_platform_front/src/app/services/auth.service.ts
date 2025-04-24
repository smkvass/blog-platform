// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/auth/'; 

  constructor(private http: HttpClient) {}

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post('http://localhost:8000/api/auth/login/', credentials);
  }
  
  register(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post('http://localhost:8000/api/auth/register/', credentials);
  }
  

  // Метод для сохранения токена в localStorage
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Метод для получения токена из localStorage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  
  logout(): void {
    // Отправим POST-запрос на Django для логаута
    this.http.post('http://localhost:8000/api/auth/logout/', {}).subscribe({
      next: () => {
        localStorage.removeItem('authToken'); // Удаляем токен
      },
      error: (err) => {
        console.error('Logout error:', err);
      }
    });
  }
  
}
