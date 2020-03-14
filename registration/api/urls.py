from django.urls import path

from registration.api.views import UserCreateView, LoginView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('users/', UserCreateView.as_view(), name='user_create'),
]
