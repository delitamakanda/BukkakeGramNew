from django.urls import path

from bukkake.api.views import BukkakeListView, BukkakeDetailView

urlpatterns = [
    path('bukkakes/', BukkakeListView.as_view(), name='bukkakes_list'),
    path('bukkakes/<int:pk>/', BukkakeDetailView.as_view(), name='bukkakes_detail'),
]
