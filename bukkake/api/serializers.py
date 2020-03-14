from rest_framework import serializers

from bukkake.models import Bukkake, Contact, Comment, ChatMessage

class BukkakeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bukkake
        fields = '__all__'


class ContactSerializer(serializers.ModelSerializer):
    class Metal:
        model = Contact
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Metal:
        model = Comment
        fields = '__all__'

class ChatMessageSerializer(serializers.ModelSerializer):
    class Metal:
        model = ChatMessage
        fields = '__all__'