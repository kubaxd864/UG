import pandas as pd
import numpy as np
from sklearn.neighbors import KNeighborsClassifier

df = pd.read_csv("iris_big_with_errors.csv")
columns = ["sepal length (cm)", "sepal width (cm)", "petal length (cm)", "petal width (cm)"]
name_col = "target_name"
allowed_names = ["setosa", "versicolor", "virginica"]

print('\nBraki w kolumnach:')
print(df.isna().sum())
print("Łącznie pustych:", df.isna().sum().sum())

for kol in columns:
    df[kol] = pd.to_numeric(df[kol], errors="coerce")
    mask = df[kol].between(0, 15, inclusive="both")
    bad = ~mask | df[kol].isna()
    med = df.loc[mask, kol].median()
    df.loc[bad, kol] = med

def validate_target_names():
    df[name_col] = df[name_col].astype(str).str.strip()
    mask_ok = df[name_col].isin(allowed_names)
    mismatches_idx = df.index[~mask_ok].tolist()
    mismatch_records = []
    clf = None
    if columns:
        train_df = df[df[name_col].isin(allowed_names)].dropna(subset=columns).copy()
        if not train_df.empty:
            X_train = train_df[columns].to_numpy(dtype=float)
            y_train = train_df[name_col].to_numpy()
            clf = KNeighborsClassifier(n_neighbors=5)
            clf.fit(X_train, y_train)

    if mismatches_idx:
        for i in mismatches_idx:
            val = df.at[i, name_col]
            values = []
            if columns:
                values = df.loc[i, columns].tolist()
            mismatch_records.append(
                {
                    "index": int(i),
                    "label": val,
                    "values": values,
                }
            )
            if clf is not None and values:
                if pd.isna(values).any():
                    print("Pomijam predykcje dla index", i, "- probka zawiera NaN")
                else:
                    sample = np.array([values], dtype=float)
                    prediction = clf.predict(sample)[0]
                    print(f"Predykcja dla index {i}: {prediction}")
                    df.loc[i, name_col] = prediction
            print(f"Znaleziono błędną nazwę: index {i}, wartość '{val}', kolumny '{values}'")
    else:
        print("Brak nieznanych etykiet.")
    return mismatch_records

mismatches = validate_target_names()
print('\nLiczba zmienionych etykiet:', len(mismatches))
print("Stworzono nowy naprawiony plik")
df.to_csv("iris_big_fixed.csv", index=False)