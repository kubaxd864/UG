# Zadanie 1 i 3

def lcs(A, B):
    n, m = len(A), len(B)
    dp = [[0] * (m + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if A[i - 1] == B[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
                
    i, j = n, m
    lcs_str = []
    while i > 0 and j > 0:
        if A[i - 1] == B[j - 1]:
            lcs_str.append(A[i - 1])
            i -= 1
            j -= 1
        elif dp[i - 1][j] >= dp[i][j - 1]:
            i -= 1
        else:
            j -= 1
    lcs_str = ''.join(reversed(lcs_str))
    return dp[n][m], lcs_str

print(lcs("abbaac", "bacbacba"))

# Zadanie 2 i 4

def lcs4(A, B):
    n, m = len(A), len(B)
    dp = [[0] * (m + 1) for _ in range(2)]
    for i in range(1, n + 1):
        dp.append([0] * (m + 1))
        dp.pop(0)
        for j in range(1, m + 1):
            if A[i - 1] == B[j - 1]:
                dp[1][j] = dp[1 - 1][j - 1] + 1
            else:
                dp[1][j] = max(dp[1 - 1][j], dp[1][j - 1])
    return dp[1][m]

print(lcs4("01010110", "01110"))