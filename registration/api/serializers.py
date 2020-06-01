from django.db import IntegrityError
from django.utils.translation import ugettext as _
from django.contrib.auth import get_user_model
from rest_framework import serializers

from registration.models import Profile

User = get_user_model()


class SignupSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = User
        fields = [
            'id',
            'username', 
            'email', 
            'password', 
            'password2',
        ]
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def create(self, validated_data):
        email = validated_data.get('email')
        username = validated_data.get('username')
        password = validated_data.get('password')

        try:
            user = User(username=username, email=email)
            user.set_password(password)
            user.save()
            Profile.objects.create(user=user)
            return user
        except IntegrityError as e:
            raise serializers.ValidationError({ 'non_field_errors': [_('Username / Email has been already registered. Try again')]})

    def validate(self, data):
        pw = data.get('password')
        pw2 = data.pop('password2')
        if pw != pw2:
            raise serializers.ValidationError(_('Passwords does not match'))
        return data


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'date_joined', 'first_name', 'last_name',)


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Profile
        fields = ('user', 'id', 'date_of_birth', 'photo', 'bio',)

    def update(self, instance, validated_data):
        return super().update(instance, validated_data)




