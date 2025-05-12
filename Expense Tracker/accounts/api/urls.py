from django.urls import path
from .views import *

urlpatterns = [
    path('signup/', CreateUserView.as_view(), name='sign up'),
    path('login/', LoginView.as_view(), name='login'),
    path("check_user/", UserExistsView.as_view()),
    path('get-csrf-token/', get_csrf_token, name='get_csrf_token'),

]
