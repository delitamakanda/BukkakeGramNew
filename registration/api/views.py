from django.contrib.auth.models import User

from rest_framework import generics, views, status
from rest_framework.response import Response
from rest_framework.authtoken import views, models
from registration.api.serializers import SignupSerializer, ProfileSerializer, UserSerializer
from registration.models import Profile


class UserCreateView(generics.CreateAPIView):
    queryset = User.objects.all()
    authentication_classes = []
    permission_classes = []
    serializer_class = SignupSerializer


class ProfileApiView(generics.RetrieveUpdateAPIView):
    authentication_classes = []
    permission_classes = []
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
    lookup_field = ('user__pk')


class CustomAuthToken(views.ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = models.Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'id': user.pk,
            'username': user.username,
            'email': user.email
        })
