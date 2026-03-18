import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

iris = pd.read_csv("iris_big.csv")
x_col = "sepal length (cm)"
y_col = "sepal width (cm)"
label_col = "target_name"

base = iris[[x_col, y_col, label_col]].copy()

mm = base.copy()
for c in [x_col, y_col]:
    c_min = base[c].min()
    c_max = base[c].max()
    mm[c] = (base[c] - c_min) / (c_max - c_min)

zs = base.copy()
for c in [x_col, y_col]:
    mean = base[c].mean()
    std = base[c].std()
    zs[c] = (base[c] - mean) / std

fig, axes = plt.subplots(1, 3, figsize=(18, 5))
sns.scatterplot(data=base, x=x_col, y=y_col, hue=label_col, ax=axes[0])
axes[0].set_title("Dane oryginalne")

sns.scatterplot(data=mm, x=x_col, y=y_col, hue=label_col, ax=axes[1])
axes[1].set_title("Min-Max [0,1]")

sns.scatterplot(data=zs, x=x_col, y=y_col, hue=label_col, ax=axes[2])
axes[2].set_title("Z-score")
plt.show()