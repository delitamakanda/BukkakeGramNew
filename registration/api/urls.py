from django.urls import path

from registration.api.views import UserCreateView
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('login/', obtain_auth_token),
    path('signup/', UserCreateView.as_view(), name='user_create'),
]
