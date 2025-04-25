import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';
import { CategoryService } from '../services/category.service'; 
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, FormsModule],  
  templateUrl: './post-list.component.html',
  styleUrls:['./post-list.component.css'],
})
export class PostListComponent implements OnInit {
  title: string = '';  
  content: string = '';  
  posts: any[] = []; 
  categories: any[] = [];  
  selectedCategory: number | null = null;  // Может быть числом или null
  selectedImage: File | null = null;  // Может быть файлом или null
  errorMessage: string = '';
  tagsInput: string = '';  

  constructor(
    private postService: PostService,
    private categoryService: CategoryService,  
    public authService: AuthService,
  ) {}

  ngOnInit() {
    this.postService.getPosts().subscribe(
      (data: any) => {
        console.log('Posts fetched:', data);
        this.posts = data;
      },
      (error: any) => {
        console.error('Error fetching posts:', error);
      }
    );

    // Получаем категории при инициализации компонента
    this.categoryService.getCategories().subscribe(
      (data: any) => {
        console.log('Categories fetched:', data);
        this.categories = data;
      },
      (error: any) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  createPost() {
    this.errorMessage = ''; 

    
    if (this.selectedCategory === null) {
      this.errorMessage = 'Please select a category';
      return;
    }

    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('content', this.content);
    formData.append('category', this.selectedCategory.toString()); // Передаем категорию как строку

    const tags = this.tagsInput.split(',').map(tag =>tag.trim());
    formData.append('tags', JSON.stringify(tags));
    
    if (this.selectedImage) {
      formData.append('image', this.selectedImage, this.selectedImage.name);
    }

    this.postService.createPost(formData).subscribe(
      (response: any) => {
        this.posts.push(response);  
        this.title = '';  
        this.content = '';
        this.selectedCategory = null;  
        this.selectedImage = null; 
      },
      (error: any) => {
        this.errorMessage = 'Error creating post';
        console.error('Error creating post:', error);
      }
    );
  }


  onImageChange(event: any) {
    this.selectedImage = event.target.files[0]; 
  }

  logout() {
    this.authService.logout(); 
  }
}
