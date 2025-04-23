from django.urls import path
from . import views
from .views import api_root

urlpatterns = [
    path('', api_root),
    path('posts/', views.get_all_posts),
    path('posts/create/', views.create_post),
    path('posts/<int:pk>/', views.PostDetailAPIView.as_view()),
    path('comments/', views.CommentListCreateAPIView.as_view()),
]
