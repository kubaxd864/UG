def sum_even(n):
    if n < 2:
        return 0
    if n % 2 == 0:
        return n + sum_even(n - 2)
    else:
        return sum_even(n - 1)

print(sum_even(10))