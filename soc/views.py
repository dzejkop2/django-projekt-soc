from django.shortcuts import render
from django.http import JsonResponse
from . models import *

def vypis_temy(request):
    temy = list(Tema.objects.all().values())
    odbory = list(Odbor.objects.all().values()) 
    ucitelia = list(Ucitel.objects.all().values())
    studenti = list(Student.objects.all().values())
    return render(request, 'soc/index.html', {"temy": temy, "odbory": odbory, "ucitelia": ucitelia, "studenti": studenti})
