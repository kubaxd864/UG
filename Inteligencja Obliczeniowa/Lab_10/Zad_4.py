from pathlib import Path

import matplotlib.pyplot as plt
import pandas as pd
from mlxtend.frequent_patterns import apriori, association_rules

DATA_PATH = Path(__file__).with_name("titanic 1.csv")

def load_titanic_data():
	df = pd.read_csv(DATA_PATH)
	first_col = df.columns[0]
	if first_col.startswith("Unnamed") or first_col == "":
		df = df.drop(columns=[first_col])
	df = df[["Class", "Sex", "Age", "Survived"]]
	return df


def one_hot_encode(df):
	df = df.astype(str)
	return pd.get_dummies(df, prefix_sep="=")


def mine_rules(basket, min_support=0.015, min_confidence=0.9):
	frequent = apriori(basket, min_support=min_support, use_colnames=True)
	rules = association_rules(
		frequent, metric="confidence", min_threshold=min_confidence
	).sort_values(by="lift", ascending=False)
	return frequent, rules


def normalize_rules(rules):
	rules = rules.copy()
	rules["antecedents_str"] = rules["antecedents"].apply(
		lambda s: ", ".join(sorted(s))
	)
	rules["consequents_str"] = rules["consequents"].apply(
		lambda s: ", ".join(sorted(s))
	)
	return rules


def filter_interesting_rules(
	rules, min_lift=2.0, min_support=0.01, min_confidence=0.8
):
	return rules[
		(rules["lift"] >= min_lift)
		& (rules["support"] >= min_support)
		& (rules["confidence"] >= min_confidence)
	]


def print_rules(rules, title, limit=10):
	print("\n" + title)
	for _, row in rules.head(limit).iterrows():
		print(
			"- {ant} -> {con} (support={sup:.3f}, confidence={conf:.3f}, lift={lift:.2f})".format(
				ant=row["antecedents_str"],
				con=row["consequents_str"],
				sup=row["support"],
				conf=row["confidence"],
				lift=row["lift"],
			)
		)


def plot_rules(rules):
	plt.figure(figsize=(8, 6))
	sizes = (rules["lift"] * 40).clip(lower=20)
	plt.scatter(rules["support"], rules["confidence"], s=sizes, alpha=0.7)
	plt.title("Association rules: support vs confidence")
	plt.xlabel("Support")
	plt.ylabel("Confidence")
	plt.grid(True, alpha=0.3)
	plt.show()


def main():
	df = load_titanic_data()
	basket = one_hot_encode(df)
	_, rules = mine_rules(basket, min_support=0.005, min_confidence=0.8)
	rules = normalize_rules(rules)

	print("Total rules found:", len(rules))
	print_rules(rules, "Top rules by lift", limit=8)

	survived_yes = rules[
		rules["consequents"].apply(lambda s: "Survived=Yes" in s)
	]
	survived_no = rules[
		rules["consequents"].apply(lambda s: "Survived=No" in s)
	]

	survived_yes = filter_interesting_rules(survived_yes, min_lift=2.0)
	survived_no = filter_interesting_rules(survived_no, min_lift=1.25)

	print_rules(survived_yes, "Rules suggesting survival", limit=10)
	print_rules(survived_no, "Rules suggesting non-survival", limit=10)
	plot_rules(rules)


if __name__ == "__main__":
	main()
