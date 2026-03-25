import pandas as pd
from sklearn.metrics import confusion_matrix
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier, export_text


def main():
    df = pd.read_csv("iris_big.csv")
    (train_set, test_set) = train_test_split(df.values, train_size=0.7, random_state=302410)
    X_train = train_set[:, :-1]
    y_train = train_set[:, -1]
    X_test = test_set[:, :-1]
    y_test = test_set[:, -1]
    labels = sorted(df.iloc[:, -1].unique().tolist())
    feature_names = list(df.columns[:-1])

    clf = DecisionTreeClassifier(random_state=302410)
    clf.fit(X_train, y_train)

    print("\nDrzewo decyzyjne")
    tree_as_text = export_text(clf, feature_names=feature_names)
    print(tree_as_text)

    name_prediction = clf.predict(X_test)
    accuracy = clf.score(X_test, y_test)
    print(f"\nDokladnosc klasyfikatora: {accuracy * 100:.2f}%")
    cm = confusion_matrix(y_test, name_prediction, labels=labels)
    cm_df = pd.DataFrame(
        cm,
        index=[f"true_{label}" for label in labels],
        columns=[f"pred_{label}" for label in labels],
    )
    print("\nMacierz bledow:")
    print(cm_df)


if __name__ == "__main__":
    main()

