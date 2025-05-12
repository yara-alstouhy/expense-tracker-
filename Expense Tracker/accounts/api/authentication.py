import jwt
from django.conf import settings
from rest_framework import authentication, exceptions
from accounts.models import MyUser


class JWTAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization')

        if not auth_header or not auth_header.startswith('Bearer '):
            return None

        token = auth_header.split()[1].strip()

        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise exceptions.AuthenticationFailed('Token has expired')
        except jwt.DecodeError:
            raise exceptions.AuthenticationFailed('Token is invalid')

        user_id = payload['user_id']
        user = MyUser.objects.get(pk=user_id)

        return user, token
