import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, FormsModule],  
  templateUrl: './post-list.component.html',
  styleUrls:['./post-list.component.css'],
})
export class PostListComponent {
  title: string = '';  
  content: string = '';  
  posts: any[] = []; 
  errorMessage: string = '';  // Переменная для хранения ошибок

  constructor(
    private postService: PostService,
    public authService: AuthService ,
  ) {}

  createPost() {
    this.errorMessage = ''; // Очистка ошибок перед отправкой
    this.postService.createPost({ title: this.title, content: this.content }).subscribe(
      (response: any) => {
        this.posts.push(response);  // Добавление нового поста в список
        this.title = '';  // Очистка полей ввода
        this.content = '';
      },
      (error: any) => {
        this.errorMessage = 'Error creating post'; // Установка ошибки
        console.error('Error creating post:', error);
      }
    );
  }

  logout() {
    this.authService.logout();  // Вызов метода logout из authService
  }

  ngOnInit() {
    // Загружаем посты при инициализации компонента
    this.postService.getPosts().subscribe(
      (data: any) => {
        console.log('Posts fetched:', data); // Логирование полученных постов
        this.posts = data;  // Заполнение списка постов
      },
      (error: any) => {
        console.error('Error fetching posts:', error);
      }
    );
  }
}
