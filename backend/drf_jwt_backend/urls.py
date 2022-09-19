from pydoc import allmethods
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView 
from rest_framework.schemas import get_schema_view
from rest_framework.permissions import AllowAny

urlpatterns = [
    #admin urls
    path('admin/', admin.site.urls),

    #swagger ui for documentation
    path('', TemplateView.as_view(
        template_name='swagger-ui.html',
        extra_context={'schema_url':'openapi-schema'}
    ), name='swagger-ui'),
    path('openapi/', get_schema_view(
        title="DRF JWT Backend",
        description="API for DRF JWT Backend",
        version="1.0.1",
        permission_classes=(AllowAny,),
        
    ), name='openapi-schema'),

    #api urls
    path('api/', include('api.urls', namespace='API')),
]
