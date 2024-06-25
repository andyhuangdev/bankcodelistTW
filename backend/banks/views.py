from .models import Bank, Branch
from .serializers import BankSerializer, BranchSerializer
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response


class BankListView(generics.ListAPIView):
    queryset = Bank.objects.all()
    serializer_class = BankSerializer


class BranchListView(generics.ListAPIView):
    serializer_class = BranchSerializer

    def get_queryset(self):
        code = self.kwargs["bank_code"]
        bank = Bank.objects.get(code=code)
        return bank.branches.all()


class BranchInfoDetail(APIView):
    def get(self, request, bank_code, branch_code, branch_name):
        bank = Bank.objects.get(code=bank_code)
        branch = Branch.objects.get(bank=bank, code=branch_code, name=branch_name)
        bank_serializer = BankSerializer(bank)
        branch_serializer = BranchSerializer(branch)
        banks = Bank.objects.all()
        banks_serializer = BankSerializer(banks, many=True)
        branches = bank.branches.all()
        branches_serializer = BranchSerializer(branches, many=True)
        return Response(
            {
                "bank": bank_serializer.data,
                "branch": branch_serializer.data,
                "banks": banks_serializer.data,
                "branches": branches_serializer.data,
            }
        )
