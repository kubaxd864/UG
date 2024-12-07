dict1 = {'Jan': 50, 'Anna': 70, 'Marta': 20, 'Piotr': 40}
sum = 0
for i in dict1:
    if i[0]== 'J' or i[0] == 'P':
        sum += dict1[i]
print(sum)