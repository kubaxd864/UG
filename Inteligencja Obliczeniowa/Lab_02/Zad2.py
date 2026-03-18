from sklearn.decomposition import PCA
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D 

iris = pd.read_csv("iris_big.csv")
feature_columns = [
	"sepal length (cm)",
	"sepal width (cm)",
	"petal length (cm)",
	"petal width (cm)",
]

X = iris[feature_columns]
mode = "2D"

if mode == "2D":
	pca_model = PCA(n_components=2)
	X_pca = pca_model.fit_transform(X)
	pca_df = pd.DataFrame(X_pca, columns=["PC1", "PC2"])
	pca_df["target_name"] = iris["target_name"]

	sns.scatterplot(data=pca_df, x="PC1", y="PC2", hue="target_name")
	plt.title("PCA 2D of Iris Dataset")
	plt.xlabel(f"PC1")
	plt.ylabel(f"PC2")
	plt.show()

	retained = pca_model.explained_variance_ratio_.sum()
	loss = 1 - retained
	print(f"Zachowana informacja: {retained*100:.2f}%")
	print(f"Utracona informacja:  {loss*100:.2f}%")
	print(pca_model.explained_variance_ratio_)

elif mode == "3D":
	pca_model = PCA(n_components=3)
	X_pca = pca_model.fit_transform(X)
	pca_df = pd.DataFrame(X_pca, columns=["PC1", "PC2", "PC3"])
	pca_df["target_name"] = iris["target_name"]

	fig = plt.figure()
	ax = fig.add_subplot(111, projection="3d")
	for species, subset in pca_df.groupby("target_name"):
		ax.scatter(subset["PC1"], subset["PC2"], subset["PC3"], label=species)

	ax.set_title("PCA 3D of Iris Dataset")
	ax.set_xlabel(f"PC1")
	ax.set_ylabel(f"PC2")
	ax.set_zlabel(f"PC3")
	ax.legend()
	plt.show()

	retained = pca_model.explained_variance_ratio_.sum()
	loss = 1 - retained
	print(f"Zachowana informacja: {retained*100:.2f}%")
	print(f"Utracona informacja:  {loss*100:.2f}%")
	print(pca_model.explained_variance_ratio_)