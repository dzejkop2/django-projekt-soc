import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'geleta.settings')
django.setup()

from soc.models import *
import datetime
import random

Student.objects.all().delete()
Ucitel.objects.all().delete()

triedy = []

for pismeno in ["AS","AL","AM","AI","BI","CI","AT","AE"]:
    triedy.append(f"4.{pismeno}")

fmena = open("mena.txt", "r", encoding="utf-8")
mena = fmena.read().splitlines()

fpriezviska = open("priezviska.txt", "r", encoding="utf-8")
priezviska = fpriezviska.read().splitlines()

email = "example@example.com"
heslo = "heslo123"

for i in range(5):
    meno = random.choice(mena)
    priezvisko = random.choice(priezviska)
    Ucitel.objects.create(meno=meno,priezvisko=priezvisko,email=email,heslo=heslo)
for i in range(20):
    meno = random.choice(mena)
    priezvisko = random.choice(priezviska)
    trieda = random.choice(triedy)
    Student.objects.create(meno=meno,priezvisko=priezvisko,trieda=trieda,email=email,heslo=heslo)