from django.urls import path

from registration.api.views import UserCreateView, ProfileApiView, CustomAuthToken
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('login/', CustomAuthToken.as_view()),
    path('signup/', UserCreateView.as_view(), name='user_create'),
    path('profile/<int:user__pk>/', ProfileApiView.as_view(), name='profile'),
]
