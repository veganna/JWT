from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class AccountAdmin(UserAdmin):
	list_display = ('email','first_name', 'last_name', 'role','date_joined', 'last_login', 'is_admin', 'is_staff')
	search_fields = ('email','first_name', 'last_name',)
	readonly_fields=('id', 'date_joined', 'last_login')

	filter_horizontal = ()
	list_filter = ()
	#remove username field and organize the admin panel
	fieldsets = (
		('Personal Info', {
			'classes': ('wide',),
			'fields': ('email', 'first_name', 'last_name', 'role', 'password')}
		),
		('Therapist', {
			'classes': ('wide',),
			'fields': ('clients',)}

		),
		('Privileges', {
			'classes': ('wide',),
			'fields': ('is_superuser', 'is_active', 'is_staff', 'is_admin')}
		),
		('Dates', {
			'classes': ('wide',),
			'fields': ('date_joined', 'last_login')}
		)
	)

admin.site.register(User, AccountAdmin)