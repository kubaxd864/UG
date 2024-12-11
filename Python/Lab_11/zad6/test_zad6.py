from zad6 import selection_sort
from zad6 import tablica

def test_selection_sort():
    assert selection_sort(tablica) == [33, 21, 11, 7, 6, 5, 2]

def test_selection_sort_2():
    assert selection_sort(tablica) == [33, 21, 11, 7, 6, 2, 5]