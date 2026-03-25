import pandas as pd
from sklearn.model_selection import train_test_split

df = pd.read_csv("iris_big.csv")
good_predictions = 0
(train_set, test_set) = train_test_split(df.values, train_size=0.7,random_state=302410)
test_len = test_set.shape[0]

def classify_iris(sl, sw, pl, pw):
    if sl > 4 and pl < 2:
        return "setosa"
    elif pw < 1.8 and pl < 5.0:
        return "versicolor"
    else:
        return "virginica"

for i in range (test_len) :
    if classify_iris(test_set[i][0], test_set[i][1], test_set[i][2], test_set[i][3]) == test_set[i][4] :
        good_predictions = good_predictions + 1

print(good_predictions)
print(good_predictions/test_len*100,"%")