import django_filters
from expenses.models import Expense


class ExpensesFilter(django_filters.FilterSet):
    month = django_filters.NumberFilter(field_name='date__month', lookup_expr='exact')
    year = django_filters.NumberFilter(field_name='date__year', lookup_expr='exact')
    date = django_filters.DateFilter(field_name='date')
    category = django_filters.NumberFilter(field_name='category__id')

    class Meta:
        model = Expense
        fields = ['date', 'month', 'category', 'year']
