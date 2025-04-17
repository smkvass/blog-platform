from django.urls import path
from . import views

urlpatterns = [
    path('posts/', views.get_all_posts),
    path('posts/create/', views.create_post),
    path('posts/<int:pk>/', views.PostDetailAPIView.as_view()),
    path('comments/', views.CommentListCreateAPIView.as_view()),
]
