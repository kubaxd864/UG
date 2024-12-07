def palindrome(s):
    if s[::-1] == s:
        return True
    else:
        return False
print(palindrome('kajak'))