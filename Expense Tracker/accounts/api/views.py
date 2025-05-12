import jwt
from datetime import datetime, timedelta

from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from .serializers import *
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.conf import settings
from django.middleware.csrf import get_token


# login
def generate_jwt_token(user):
    payload = {
        'user_id': user.id,
        'exp': datetime.utcnow() + timedelta(days=30),  # Token expiration time
        'iat': datetime.utcnow(),
    }
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
    return token


class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        password = request.data.get('password')
        username = request.data.get('username')
        if not username:
            return Response({'error': 'username are required'}, status=status.HTTP_400_BAD_REQUEST)
        user = get_object_or_404(MyUser, username=username)
        if not password:
            return Response({'error': 'password is required'}, status=status.HTTP_401_UNAUTHORIZED)
        if not user.check_password(password):
            return Response({'error': 'invalid password'}, status=status.HTTP_400_BAD_REQUEST)

        token = generate_jwt_token(user)

        return Response(
            {
                'token': token,
                'id': user.id,
                'username': user.username,
                'name': user.full_name,
            },
            status=status.HTTP_200_OK
        )


class UserExistsView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        if not username:
            return Response({'error': 'username is required'}, status=status.HTTP_400_BAD_REQUEST)
        if MyUser.objects.filter(username=username).exists():
            return Response("User Exists", status=status.HTTP_200_OK)
        return Response("User Not Found", status=status.HTTP_404_NOT_FOUND)


# sign up
@method_decorator(csrf_exempt, name='dispatch')
class CreateUserView(generics.CreateAPIView):
    serializer_class = MyUserSerializer
    permission_classes = [AllowAny]

    # def perform_create(self, serializer):
    #     # Save the user instance
    #     user = serializer.save()
    #     return user

    def create(self, request, *args, **kwargs):
        # Create the user
        response = super().create(request, *args, **kwargs)
        # Get the created user instance
        user = MyUser.objects.get(id=response.data['id'])
        # Generate JWT token
        token = generate_jwt_token(user)
        # Return response with token and user
        return Response({'token': token, 'user': response.data}, status=status.HTTP_201_CREATED)


def get_csrf_token(request):
    return JsonResponse({'csrfToken': get_token(request)})
