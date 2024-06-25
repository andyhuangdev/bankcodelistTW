from django.urls import path, include
from .views import BankListView, BranchListView, BranchInfoDetail

app_name = 'banks'

urlpatterns = [
    path('',BankListView.as_view(), name='banks'),
    path('<str:bank_code>/branches/',BranchListView.as_view(), name='branches'),
    path('<str:bank_code>/<str:branch_code>/<str:branch_name>/',BranchInfoDetail.as_view(), name='branch-detail'),
]
