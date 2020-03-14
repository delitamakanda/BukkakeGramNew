from rest_framework import generics

from bukkake.models import Bukkake
from bukkake.api.serializers import BukkakeSerializer


class BukkakeListView(generics.ListCreateAPIView):
    queryset = Bukkake.objects.all()
    serializer_class = BukkakeSerializer
    permission_classes = ()
    authentication_classes = ()


class BukkakeDetailView(generics.RetrieveDestroyAPIView):
    queryset = Bukkake.objects.all()
    serializer_class = BukkakeSerializer
    permission_classes = ()
    authentication_classes = ()
    