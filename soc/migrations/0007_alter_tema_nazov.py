# Generated by Django 4.2.7 on 2024-06-08 16:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('soc', '0006_alter_tema_options_alter_odbor_nazov_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tema',
            name='nazov',
            field=models.CharField(max_length=80),
        ),
    ]
