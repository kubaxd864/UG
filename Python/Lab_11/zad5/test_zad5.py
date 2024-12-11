from zad5 import in_table
from zad5 import tablica

def test_in_table_0():
    assert in_table(0, tablica)

def test_in_table_3():
    assert in_table(3, tablica)

def test_in_table_5():
    assert in_table(5, tablica)

def test_in_table_13():
    assert in_table(13, tablica)
