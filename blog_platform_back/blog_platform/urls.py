from django.contrib import admin
from django.urls import path, include
from blog.views import home
from user import views
from django.conf import settings
from django.conf.urls.static import static

from user.views import LoginView, RegisterView, LogoutView, UserView  

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/posts/', include('blog.urls')),
    path('api/', include('blog.urls')),
    path('api/auth/login/', LoginView.as_view(), name='login'),
    path('api/auth/register/', RegisterView.as_view(), name='register'),
    path('api/auth/logout/', LogoutView.as_view(), name='logout'),
    path('api/auth/user/', UserView.as_view(), name='user'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
