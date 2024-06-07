from django.shortcuts import render
from django.http import JsonResponse,HttpResponse,HttpResponseBadRequest
from . models import *

def vypis_temy(request):
    temy = Tema.objects.all()
    odbory = Odbor.objects.all()
    ucitelia = Ucitel.objects.all()
    studenti = Student.objects.all()
    dostupnost = Dostupnost.objects.all()
    return render(request, 'soc/index.html', {"temy": temy, "odbory": odbory, "ucitelia": ucitelia, "studenti": studenti, "dostupnost": dostupnost})

def vypis_ucitela(request):
    ucitel = Ucitel.objects.all()
    return render(request, 'soc/index.html', {"ucitel": ucitel})

def vypis_student(request):
    student = Student.objects.all()
    return render(request, 'soc/index.html', {"student": student})

def statistiky(request):
    temy = Tema.objects.all()
    return render(request, 'soc/statistiky.html', {"temy": temy})

def add_tema(request):
    message = ""
    if request.method == "POST":
        konzultant = Ucitel.objects.get(pk=request.POST["konzultant"])
        odbor = Odbor.objects.get(pk=request.POST["odbor"])
        nazov = request.POST["nazov"]
        popis = request.POST["popis_temy"]
        

        if not nazov or not popis:
            return HttpResponseBadRequest("Title and Description are required fields.")

        if request.POST["student"] == "":
            dostupnost = Dostupnost.objects.get(nazov="Voľné")
            tema = Tema(
                nazov=nazov,
                popis=popis,
                odbor=odbor,
                conzultant=konzultant,
                student=None,
                dostupnost=dostupnost,
                kontroly=0
            )
        else:
            student = Student.objects.get(pk=request.POST["student"])
            dostupnost = Dostupnost.objects.get(nazov="Zabrané")
            tema = Tema(
                nazov=nazov,
                popis=popis,
                odbor=odbor,
                conzultant=konzultant,
                student=student,
                dostupnost=dostupnost,
                kontroly=0
            )

        tema.save()
        message = "Podarilo sa vytvoriť novú tému!"
        

    odbory = Odbor.objects.all()
    ucitelia = Ucitel.objects.all()
    studenti = Student.objects.all()
    dostupnost = Dostupnost.objects.all()
    return render(request, "soc/add_tema.html", {"odbory": odbory, "ucitelia": ucitelia, "studenti": studenti, "dostupnost": dostupnost, "message":message})