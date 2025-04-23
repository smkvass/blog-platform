// src/app/services/post.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private apiUrl = 'http://localhost:8000/api/blog/';

  constructor(private http: HttpClient) {}

  // Получить все посты
  getPosts(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Создать пост
  createPost(postData: any): Observable<any> {
    return this.http.post(this.apiUrl, postData);
  }
}
