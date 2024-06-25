from rest_framework import serializers
from .models import Bank, Branch


class BankSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bank
        fields = "__all__"


class BranchSerializer(serializers.ModelSerializer):
    url = serializers.SerializerMethodField()
    bank = BankSerializer()

    class Meta:
        model = Branch
        fields = "__all__"

    def get_url(self, object):
        request = self.context.get("request")
        if request is None:
            return None
        branch_name = object.name
        return request.build_absolute_uri(
            f"/{object.bank.code}/{object.code}/{branch_name}"
        )
