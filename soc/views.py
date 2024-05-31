from django.shortcuts import render
from . models import *

def vypis_temy(request):
    temy = Tema.objects.all().order_by("dostupnost")
    return render(request, 'soc/index.html', {"temy":temy})
