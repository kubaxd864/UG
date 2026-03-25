import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import (
accuracy_score,
precision_score,
recall_score,
confusion_matrix,
)
from sklearn.model_selection import train_test_split
from sklearn.naive_bayes import GaussianNB
from sklearn.neural_network import MLPClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.tree import DecisionTreeClassifier


def main():
    df = pd.read_csv("diagnosis.csv")
    colors = df["diagnosis"].map({0: "blue", 1: "red"})
    fig = plt.figure(figsize=(9, 7))
    ax = fig.add_subplot(111, projection="3d")
    ax.scatter(
        df["param1"],
        df["param2"],
        df["param3"],
        c=colors,
        alpha=0.75,
        s=24,
    )
    ax.set_title("Wykres 3D danych (niebieski=zdrowy, czerwony=chory)")
    ax.set_xlabel("param1")
    ax.set_ylabel("param2")
    ax.set_zlabel("param3")
    plt.tight_layout()
    plt.show()

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
        y_pred = model.predict(X_test)
        acc = accuracy_score(y_test, y_pred)
        prec = precision_score(y_test, y_pred, pos_label=1, zero_division=0)
        rec = recall_score(y_test, y_pred, pos_label=1, zero_division=0) 
        cm = confusion_matrix(y_test, y_pred, labels=[0, 1])
        models_results.append(
            {
                "model": model_name,
                "accuracy": acc,
                "precision": prec,
                "recall_sensitivity": rec,
                "cm": cm,
            }
        )

        cm_df = pd.DataFrame(
            cm,
            index=["true_zdrowy", "true_chory"],
            columns=["pred_zdrowy", "pred_chory"],
        )
        plt.figure(figsize=(5, 4))
        sns.heatmap(cm_df, annot=True, fmt="d", cmap="Blues")
        plt.title(f"Confusion Matrix - {model_name}")
        plt.tight_layout()
        plt.show()

    print("\n=== Ranking modeli ===")
    for m in models_results:
        print(
            f"{m['model']}: "
            f"Accuracy={m['accuracy'] * 100:.2f}% | "
            f"Precision={m['precision'] * 100:.2f}% | "
            f"Recall={m['recall_sensitivity'] * 100:.2f}%"
        )

if __name__ == "__main__":
    main()

# Accuracy to odsetek wszystkich poprawnych klasyfikacji wykonanych przez model
# Precision to sprawdzenie jaki procent oznaczonych jako chory lub zdrowy faktycznie jest posiada odpowiednią klasyfikacje.
# Recall/Sensitivity to jaki procent rzeczywiście chorych/zdrowych został wykryty.
# Przy niezbalansowanych danych Accuracy bywa myląca i sama nie jest bezpieczną miarą.