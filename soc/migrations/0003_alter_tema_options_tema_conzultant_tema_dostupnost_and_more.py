# Generated by Django 4.2.13 on 2024-05-31 09:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('soc', '0002_odbor_student_tema_alter_ucitel_id'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='tema',
            options={'ordering': ['nazov'], 'verbose_name': 'Tema', 'verbose_name_plural': 'Temy'},
        ),
        migrations.AddField(
            model_name='tema',
            name='conzultant',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='soc.ucitel'),
        ),
        migrations.AddField(
            model_name='tema',
            name='dostupnost',
            field=models.CharField(default='Voľné', max_length=15),
        ),
        migrations.AddField(
            model_name='tema',
            name='kontroly',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='tema',
            name='odbor',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='soc.odbor'),
        ),
        migrations.AddField(
            model_name='tema',
            name='student',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='soc.student'),
        ),
        migrations.AlterField(
            model_name='odbor',
            name='cislo',
            field=models.IntegerField(),
        ),
    ]