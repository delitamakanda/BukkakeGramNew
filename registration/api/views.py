from django.contrib.auth.models import User

from rest_framework import generics
from registration.api.serializers import SignupSerializer


class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    authentication_classes = []
    permission_classes = []
    serializer_class = SignupSerializer
