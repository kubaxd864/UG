from zad7 import bubble_sort

def test_bubble_sort_1():
    assert bubble_sort([5, 4, 3, 2, 1]) == [1, 2, 4, 3, 5]

def test_bubble_sort_2():
    assert bubble_sort([5, 4, 3, 2, 1]) == [1, 2, 3, 4, 5]