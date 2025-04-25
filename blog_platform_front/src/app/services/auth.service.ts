import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/auth/';
  private userNameSubject = new BehaviorSubject<string | null>(null); 
  userName$ = this.userNameSubject.asObservable(); 

  constructor(private http: HttpClient) {}

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}login/`, credentials).pipe(
      switchMap((response: any) => {
        this.saveTokens(response.access, response.refresh);
        this.setUserName(response.name); 
        return new Observable((observer) => {
          observer.next(response);
          observer.complete();
        });
      })
    );
  }
  

  register(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}register/`, credentials);
  }

  saveTokens(access: string, refresh: string): void {
    localStorage.setItem('authToken', access);  // Сохраняем access токен
    localStorage.setItem('refreshToken', refresh);  // Сохраняем refresh токен
  }
  

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  setUserName(name: string): void {
    this.userNameSubject.next(name);
  }

  getUserName(): string | null {
    return this.userNameSubject.value;
  }

  logout(): void {
    this.http.post(`${this.apiUrl}logout/`, {}).subscribe({
      next: () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        this.userNameSubject.next(null); // Сброс имени пользователя
      },
      error: (err) => {
        console.error('Logout error:', err);
      }
    });
  }

  // Обновление токена при его истечении
  refreshAccessToken(): Observable<any> {
    const refresh = localStorage.getItem('refreshToken');
    if (refresh) {
      return this.http.post(`${this.apiUrl}token/refresh/`, { refresh }).pipe(
        switchMap((response: any) => {
          this.saveTokens(response.access, response.refresh);
          return response;
        }),
        catchError(err => {
          console.error('Token refresh error:', err);
          return []; // Возвращаем пустой массив в случае ошибки
        })
      );
    }
    return new Observable(); // Если нет refresh токена, возвращаем пустой Observable
  }
}
