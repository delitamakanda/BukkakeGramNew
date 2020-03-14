from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response

from django.contrib.auth import authenticate

from registration.api.serializers import UserSerializer

class LoginView(APIView):
    permission_classes = ()

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            return Response({'token': user.auth_token.key})
        else:
            return Response({'error': 'Les informations de connexions sont invalides'}, status=status.HTTP_400_BAD_REQUEST)


class UserCreateView(generics.CreateAPIView):
    authentication_classes = ()
    permission_classes = ()
    serializer_class = UserSerializer
