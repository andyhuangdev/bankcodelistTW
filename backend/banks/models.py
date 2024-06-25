from django.db import models


class Bank(models.Model):
    code = models.CharField(max_length=8, unique=True)
    name = models.CharField(max_length=32)


class Branch(models.Model):
    bank = models.ForeignKey(Bank, on_delete=models.CASCADE, related_name="branches")
    code = models.CharField(max_length=8, unique=True)
    name = models.CharField(max_length=32)
    address = models.TextField()
    phone = models.CharField(max_length=16)
