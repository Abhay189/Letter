# Generated by Django 5.1.1 on 2024-09-30 04:15

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="User",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("first_name", models.CharField(max_length=50)),
                ("last_name", models.CharField(max_length=50)),
                ("phone_num", models.CharField(max_length=20, unique=True)),
                ("email", models.EmailField(max_length=254, unique=True)),
                ("password", models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name="UserContact",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("contact_name", models.CharField(max_length=50)),
                (
                    "contact",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="contact_users",
                        to="chat.user",
                    ),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="user_contacts",
                        to="chat.user",
                    ),
                ),
            ],
            options={
                "unique_together": {("user", "contact")},
            },
        ),
        migrations.AddField(
            model_name="user",
            name="contacts",
            field=models.ManyToManyField(
                blank=True,
                related_name="contact_set",
                through="chat.UserContact",
                to="chat.user",
            ),
        ),
    ]