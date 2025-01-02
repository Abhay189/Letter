from django.contrib import admin

# Register your models here.
from .models import User,UserContact

admin.site.register([User,UserContact])