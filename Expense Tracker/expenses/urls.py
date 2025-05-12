from django.urls import path, include

urlpatterns = [
    path('api_expenses/', include('expenses.api.urls'))

]
