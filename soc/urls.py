from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.vypis_temy, name="temy"),
    path('statistky/', views.statistiky, name="statistiky"),
    path('pridanie/', views.add_tema, name="pridanie"),
    path('tema/<tema_id>',views.tema_detail, name="tema"),
    path('ucitel/<ucitel_id>',views.vypis_ucitela, name="ucitel"),
]
