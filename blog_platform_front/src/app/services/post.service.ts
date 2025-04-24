import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {  // <-- ОБЯЗАТЕЛЬНО такое имя!
  private apiUrl = 'http://localhost:8000/api/posts/';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createPost(postData: { title: string; content: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, postData);
  }
}
