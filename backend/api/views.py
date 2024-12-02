from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status


@api_view(['POST'])
def Register(request):
    if request.method == 'POST':
        serializer = UserRegisterSerializer(data = request.data)
        data = {}
        if serializer.is_valid():
            account = serializer.save()
            data["email"] = account.email
            print(account.email)
            data["response"] = "account has been created"

            refresh = RefreshToken.for_user(account)

            data["token"] = {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            }
        else:
            data = serializer.errors

        return Response(data, status=status.HTTP_200_OK)



@api_view(["POST"])
def Logout(request):
    if request.method == "POST":
        request.user.auth_token.delete()
        return Response({"message": "your are logged out "})


@api_view(["POST"])
def Login(request):
    dicti = {}
    if request.method == "POST":
        data = TokenObtainPairSerializer(data=request.data)
        if data.is_valid():
            dicti = {
                "access": data.validated_data["access"],
                "refresh": data.validated_data["refresh"],
            }
            print(dicti["access"])

            return Response(dicti, status=status.HTTP_200_OK)
        else:
            return Response(data.errors, status=status.HTTP_400_BAD_REQUEST)