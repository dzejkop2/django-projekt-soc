from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.vypis_temy, name="temy"),
    path('statistky/', views.statistiky, name="statistiky"),
    path('pridanie/', views.add_tema, name="pridanie"),
]
