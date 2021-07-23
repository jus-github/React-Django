from .serializers import PlanSerializer
from django.shortcuts import render
from.models import Plan
from rest_framework.generics import ListAPIView,CreateAPIView,DestroyAPIView
# Create your views here.


class PlanList(ListAPIView):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer


class PlanCreate(CreateAPIView):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer


class PlanDestroy(DestroyAPIView):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer
    # lookup_field='id'
    # ya to url me pk kro ya views me lookup me id likho,,,

