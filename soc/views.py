from django.shortcuts import render
from django.http import JsonResponse,HttpResponse,HttpResponseBadRequest
from django.db.models import Count
from . models import *

def vypis_temy(request):
    temy = Tema.objects.all()
    odbory = Odbor.objects.all()
    ucitelia = Ucitel.objects.all()
    studenti = Student.objects.all()
    dostupnost = Dostupnost.objects.all()
    return render(request, 'soc/index.html', {"temy": temy, "odbory": odbory, "ucitelia": ucitelia, "studenti": studenti, "dostupnost": dostupnost})

def vypis_ucitela(request,ucitel_id):
    succ_message = ""
    if request.method == "POST":
        tema = Tema.objects.get(pk=request.POST["tema_id"])
        if(request.POST.get("prijat",None) != None):
            dostupnost = Dostupnost.objects.get(nazov="Zabrané")
            tema.dostupnost = dostupnost
            tema.save()
            succ_message = "Podarilo sa prijať študenta!"
        elif(request.POST.get("zamietnut",None) != None):
            dostupnost = Dostupnost.objects.get(nazov="Voľné")
            tema.student = None
            tema.dostupnost = dostupnost
            tema.save()
            succ_message = "Podarilo sa zamietnuť študenta!"
        elif(request.POST.get("update",None) != None):
            tema.kontroly = request.POST["kontroly"]
            tema.save()
            succ_message = "Podarilo sa aktualizovať tému!"

    ucitel = Ucitel.objects.get(pk=ucitel_id)
    temy = Tema.objects.filter(conzultant=ucitel).order_by("-dostupnost")
    return render(request, 'soc/ucitel.html', {"ucitel": ucitel,"temy": temy,"succ_message":succ_message})

def vypis_student(request,student_id):
    student = Student.objects.get(pk=student_id)
    temy = Tema.objects.filter(student=student).order_by("-dostupnost")
    return render(request, 'soc/student.html', {"student": student,"temy": temy})

def tema_detail(request,tema_id):
    succ_message = ""
    err_message = ""
    if request.method == "POST":
        tema = Tema.objects.get(pk=tema_id)
        student = Student.objects.get(pk=request.POST["student"])
        tema.student = student
        tema.dostupnost = Dostupnost.objects.get(nazov="Čakajúce")
        tema.save()
        succ_message = "Podarilo sa ti prihlasiť!"
    tema = Tema.objects.get(pk=tema_id)
    studenti = Student.objects.all()
    return render(request, 'soc/tema.html', {"tema": tema,"studenti": studenti,"err_message":err_message,"succ_message":succ_message})

def statistiky(request):
    temy = Tema.objects.all().count()
    zabrane = Tema.objects.filter(dostupnost=Dostupnost.objects.get(nazov="Zabrané")).count()
    volne = Tema.objects.filter(dostupnost=Dostupnost.objects.get(nazov="Voľné")).count()
    cakajuce = Tema.objects.filter(dostupnost=Dostupnost.objects.get(nazov="Čakajúce")).count()
    ucitelia = Ucitel.objects.all().count()
    ziaci = Student.objects.all().count()
    studenti_s_temamy = Student.objects.annotate(temy=Count('tema'))
    count_studenti = studenti_s_temamy.filter(temy__gt=0).count()
    count_studenti_bez = studenti_s_temamy.filter(temy=0).count()
    ucitelia_s_temamy = Ucitel.objects.annotate(temy=Count('tema'))
    count_ucitelia = ucitelia_s_temamy.filter(temy__gt=0).count()
    count_ucitelia_bez = ucitelia_s_temamy.filter(temy=0).count()
    return render(request, 'soc/statistiky.html', {"temy": temy, "zabrane":zabrane,"cakajuce":cakajuce,"volne":volne,"ziaci":ziaci,"ucitelia":ucitelia,"studenti_s_temamy":count_studenti,"ucitelia_s_temamy":count_ucitelia,"ucitelia_bez_temy":count_ucitelia_bez,"studenti_bez_temy":count_studenti_bez})

def add_tema(request):
    message = ""
    if request.method == "POST":
        konzultant = Ucitel.objects.get(pk=request.POST["konzultant"])
        odbor = Odbor.objects.get(pk=request.POST["odbor"])
        nazov = request.POST["nazov"]
        popis = request.POST["popis_temy"]
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