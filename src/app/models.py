from django.db import models

class Card(models.Model):
    title = models.CharField(max_length=64)
    content = models.TextField(max_length=250)
    
    def publish(self):
        self.save()
    
    def __str__(self):
        return self.title
    