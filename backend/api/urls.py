from django.urls import path
from .views import *

app_name = 'API'

urlpatterns = [
    path('register/', RegisterView.as_view(), name="register"),
    path('login/', MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('login/refresh/', MyTokenRefreshView.as_view(), name="token_refresh"),
    path('journal/', JournalView.as_view(), name="journal"),
    path('journal/availability/', JournalAvailableView.as_view(), name="journal_available"),
    path('therapist/dashboard/', TherapistDashboardView.as_view(), name="therapist_dashboard"),
]
