from dataclasses import fields
from rest_framework import serializers
from .models import Journal
from authentication.models import User

class JournalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Journal
        fields = ('mood', 'weather', 'title', 'description', 'content')

    def create(self, validated_data):
        object = Journal(**validated_data)
        user = self.context['request'].user
        object.user = user
        object.save()
        return object

class JournalSerializerGet(serializers.ModelSerializer):
    class Meta:
        model = Journal
        fields = ('mood', 'weather', 'title', 'description', 'content', 'creation_date')

class TherapistDashboardSerializer(serializers.ModelSerializer):
    journals = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ( 'email', 'first_name', 'last_name', 'role', 'user_city', 'journals' )

    def get_journals(self, obj):
        journals = Journal.objects.filter(user=obj)
        serializer = JournalSerializerGet(journals, many=True)
        return serializer.data    