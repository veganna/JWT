# from django.db import models
from email.policy import default
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.db import models

#this is to us be able to login using our email
#but this way the email field become case sensitive so we fixed it on the backend.py file

class MyAccountManager(BaseUserManager):
	def create_user(self, email, username="", password=None):
		if not email:
			raise ValueError('Users must have an email address')

		user = self.model(
			email=self.normalize_email(email),
			username=self.normalize_email(email),
		)

		user.set_password(password)
		user.save(using=self._db)
		return user

	def create_superuser(self, email, username="", password=None):
		user = self.create_user(
			email=self.normalize_email(email),
			password=password,
			username=self.normalize_email(email),
		)
		user.is_admin = True
		user.is_staff = True
		user.is_superuser = True
		user.save(using=self._db)
		return user

	

# this is the default Base for all user models 
# per example we want to have diferent types of users the therapist and the patient(Client) 
# we could create a new model for each one of them if it's needed
# all we have to do is create a new AbstractUser inheriting from the default one

class User(AbstractBaseUser):
    first_name              = models.CharField(max_length=255, blank=True)
    last_name               = models.CharField(max_length=255, blank=True)
    role                    = models.CharField(max_length=15, blank=True)
    user_city               = models.CharField(max_length=50)
    date_joined				= models.DateTimeField(verbose_name='date joined', auto_now_add=True)
    last_login				= models.DateTimeField(verbose_name='last login', auto_now=True)
    is_admin				= models.BooleanField(default=False)
    is_active				= models.BooleanField(default=True)
    is_staff				= models.BooleanField(default=False)
    is_superuser			= models.BooleanField(default=False)
    email                   = models.EmailField(verbose_name="email", max_length=60, unique=True)
    clients 				= models.ManyToManyField('self', blank=True, symmetrical=False)
    username                = models.CharField(max_length=255, unique=True)
    USERNAME_FIELD = 'email'
    objects = MyAccountManager()
	
    def get_clients(self): return self.clients
    def has_perm(self, perm, obj=None): return self.is_admin
    def __str__(self): return self.first_name + ' ' + self.last_name
    def has_module_perms(self, app_label): return True