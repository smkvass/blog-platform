from django.contrib import admin
from django.urls import path, include
from blog.views import home
from user import views

from user.views import LoginView, RegisterView, LogoutView, UserView  # 👈 импорт

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/posts/', include('blog.urls')),
    path('api/auth/login/', LoginView.as_view(), name='login'),
    path('api/auth/register/', RegisterView.as_view(), name='register'),
    path('api/auth/logout/', LogoutView.as_view(), name='logout'),
    path('api/auth/user/', UserView.as_view(), name='user'),
]
