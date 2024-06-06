from django.db import models

class Dostupnost(models.Model):
    nazov = models.CharField(max_length=20);
    def __str__(self):
        return f"{self.nazov}"
    
    class Meta:
        verbose_name = "Dostupnosť"
        verbose_name_plural = "Dostupnosť"


class Ucitel(models.Model):
    id = models.AutoField(primary_key=True)
    meno = models.CharField(max_length=30)
    priezvisko = models.CharField(max_length=30)
    email = models.EmailField(max_length=50)
    heslo = models.CharField(max_length=30)
    def __str__(self):
        return f"{self.meno} {self.priezvisko}"
    
    class Meta:
        verbose_name = "Ucitel"
        verbose_name_plural = "Ucitelia"
        ordering = ['priezvisko']

class Student(models.Model):
    id = models.AutoField(primary_key=True)
    meno = models.CharField(max_length=30)
    priezvisko = models.CharField(max_length=30)
    email = models.EmailField(max_length=50)
    heslo = models.CharField(max_length=30)
    trieda = models.CharField(max_length=10)
    
    def __str__(self):
        return f"{self.meno} {self.priezvisko}"
    
    class Meta:
        verbose_name = "Student"
        verbose_name_plural = "Studenti"
        ordering = ['priezvisko']

class Odbor(models.Model):
    cislo = models.IntegerField()
    nazov = models.CharField(max_length=30)
    popis = models.TextField(max_length=500)

    def __str__(self):
        return f"{self.cislo} - {self.nazov}"
    
    class Meta:
        verbose_name = "Odbor"
        verbose_name_plural = "Odbori"
        ordering = ["cislo"]

class Tema(models.Model):
    nazov = models.CharField(max_length=60)
    popis = models.TextField(max_length=500)
    conzultant = models.ForeignKey(Ucitel, on_delete=models.CASCADE,default=1)
    student = models.ForeignKey(Student, on_delete=models.SET_NULL, null=True, blank=True)
    odbor = models.ForeignKey(Odbor, on_delete=models.CASCADE,default=1)
    dostupnost = models.ForeignKey(Dostupnost, on_delete=models.CASCADE,default=1)
    kontroly = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.nazov}"
    
    class Meta:
        verbose_name = "Tema"
        verbose_name_plural = "Temy"
        ordering = ["dostupnost"]



