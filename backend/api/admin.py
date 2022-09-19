from django.contrib import admin
from .models import *


class JournalAdmin(admin.ModelAdmin):
    list_display = ('title', 'mood', 'weather', 'creation_date', 'user')
    list_filter = ('creation_date', 'user')
    search_fields = ('title', 'mood', 'weather', 'creation_date', 'user')
    ordering = ('-creation_date',)

admin.site.register(Journal, JournalAdmin)
# Register your models here.
