import pandas as pd
from sklearn.metrics import accuracy_score, confusion_matrix
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB
from sklearn.neural_network import MLPClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.tree import DecisionTreeClassifier


def main():
    df = pd.read_csv("iris_big.csv")
    (train_set, test_set) = train_test_split(df.values, train_size=0.7, random_state=302410)
    X_train = train_set[:, :-1]
    y_train = train_set[:, -1]
    X_test = test_set[:, :-1]
    y_test = test_set[:, -1]

    models = {
        "DecTree": DecisionTreeClassifier(random_state=302410),
        "3NN": make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=3)),
        "5NN": make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=5)),
        "11NN": make_pipeline(StandardScaler(), KNeighborsClassifier(n_neighbors=11)),
        "NB": GaussianNB(),
        "MLP": make_pipeline(
            StandardScaler(),
            MLPClassifier(hidden_layer_sizes=(16,), max_iter=2000, random_state=302410),
        ),
    }

    models_results = []
    for model_name, model in models.items():
        model.fit(X_train, y_train)
        name_predict = model.predict(X_test)
        accuracy = accuracy_score(y_test, name_predict)
        models_results.append((model_name, accuracy))

    print("\n=== Ranking Klasyfikatorów ===")
    for name, acc in models_results:
        print(f"{name}: {acc * 100:.2f}%")

if __name__ == "__main__":
    main()


