// src/app/services/category.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:8000/api/posts/categories/'; // Убедитесь, что URL правильный

  constructor(private http: HttpClient) { }

  // Метод для получения всех категорий
  getCategories(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
