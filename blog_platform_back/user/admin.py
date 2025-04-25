from django.contrib import admin
from django.contrib.auth import get_user_model

User = get_user_model() 
users = User.objects.all()
admin.site.register(User)
