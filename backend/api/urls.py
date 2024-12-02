from django.urls import path
from rest_framework.authtoken.views import (
    obtain_auth_token,
)
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path(
        "api/token/",
        TokenObtainPairView.as_view(),
        name="token_obtain_pair",
    ),
    path(
        "api/token/refresh/",
        TokenRefreshView.as_view(),
        name="token_refresh",
    ),
    path("login/", views.Login, name="login"),
    path(
        "logout/",
        views.Logout,
        name="logout",
    ),
    path(
        "register/",
        views.Register,
        name="register",
    ),
]