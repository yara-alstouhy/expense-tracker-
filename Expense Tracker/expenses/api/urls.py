from django.urls import path
from .views import *

urlpatterns = [
    path('category/', ListCreateCategoryAPIView.as_view(), name='category'),
    path('category/<int:pk>/', CategoryUpdateDelAPIView.as_view()),
    path('create_expense/', ListCreateExpenseAPIView.as_view(), name='expense'),
    path('expense/<int:pk>/', ExpenseUpdateDelAPIView.as_view()),
    path('expense/', FilterExpenseAPIView.as_view()),
]
