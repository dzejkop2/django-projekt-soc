import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'geleta.settings')
django.setup()

from soc.models import *
import datetime
import random

Student.objects.all().delete()
