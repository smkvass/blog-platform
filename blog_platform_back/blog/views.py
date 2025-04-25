from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status, generics
from django.contrib.auth import get_user_model
User = get_user_model()
from .models import Post, Comment, Tag, Category
from .serializers import PostSerializer, CommentSerializer, CategorySerializer
from django.http import HttpResponse

def home(request):
    return HttpResponse("Your code is working")

# Create your views here.
@api_view(['GET'])
def api_root(request):
    return Response({"message": "API is working"})

#FBV - получить все посты
@api_view(['GET'])
def get_all_posts(request):
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)
    return Response(serializer.data)

#FBV - создать пост
from datetime import datetime

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_post(request):
    data = request.data.copy()
    data['author'] = request.user.id
    
    
    if 'tags' in request.data:
        tag_ids = request.data.get('tags', [])
        tags = Tag.objects.filter(id__in=tag_ids)
        data['tags'] = tags

    serializer = PostSerializer(data=data)

    if serializer.is_valid():
        post = serializer.save()  
        
        if 'image' in request.data:
            post.image = request.FILES.get('image')
            post.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_categories(request):
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data)

class PostDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    
class CommentListCreateAPIView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)