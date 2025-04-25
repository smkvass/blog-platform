import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = 'http://localhost:8000/api/posts/';  // URL для отправки запросов

  constructor(private http: HttpClient) { }

  // Метод для получения всех постов
  getPosts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Метод для создания поста с использованием FormData
  createPost(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'create/', formData);
  }
}
