#default imports
from dataclasses import fields
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from authentication.serializers import RegistrationSerializer, MyTokenObtainPairSerializer
from .models import *
from .serializers import *
import datetime

#init auth views
#register view
class RegisterView(generics.GenericAPIView):
    serializer_class = RegistrationSerializer
    permission_classes = (AllowAny,)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(
            {
                "user": RegistrationSerializer(user, context=self.get_serializer_context()).data,
                "message": "User Created Successfully.  Now perform Login to get your token",
            }
        )
#login view
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

#refresh token view
class MyTokenRefreshView(TokenRefreshView):
    serializer_class = MyTokenObtainPairSerializer

#init journal views
#journal view
class JournalView(generics.GenericAPIView):
    serializer_class = JournalSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        journals = Journal.objects.filter(user=request.user).order_by('-creation_date')[:31]
        serializer = JournalSerializerGet(journals, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        journal = serializer.save()
        return Response(
            {
                "journal": JournalSerializer(journal, context=self.get_serializer_context()).data,
                "message": "Journal Created Successfully.",
            }
        )
#journal availability view
class JournalAvailableView(generics.GenericAPIView):
    serializer_class = JournalSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        journals = Journal.objects.filter(user=request.user).order_by('-creation_date')[:1]

        if not journals:
            return Response(
                {
                    "message": "Journal Available",
                    "is_available": True
                }  
            )

        if journals[0].creation_date == datetime.date.today():
            return Response(
                {
                    "message": "Journal already exists for today.",
                    "is_available": False
                }
            )

        return Response(
            {
                "message": "Journal Available",
                "is_available": True
            }
        )

class TherapistDashboardView(generics.GenericAPIView):
    serializer_class = TherapistDashboardSerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        clients = request.user.get_clients()
        #create a new field in the serializer to return the journals
         
        serializer = TherapistDashboardSerializer(clients, many=True)

        return Response({
            "message": "Clients List",
            "clients": serializer.data
        })