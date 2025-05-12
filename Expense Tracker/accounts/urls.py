from django.urls import path,include


urlpatterns = [
    path('api_account/',include('accounts.api.urls'))

]
