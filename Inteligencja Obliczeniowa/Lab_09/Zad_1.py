import nltk
import matplotlib.pyplot as plt
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from collections import Counter
from wordcloud import WordCloud

nltk.download('punkt')
nltk.download('punkt_tab')

with open("article.txt", "r", encoding="utf-8") as f:
    text = f.read()

lemmatizer = WordNetLemmatizer()
tokens = word_tokenize(text)
tokens = [w for w in tokens if w.isalpha()]
stop_words = set(stopwords.words('english'))
filtered_tokens = [word for word in tokens if word.lower() not in stop_words]
custom_stopwords = {'said', 'would', 'also'}  
stop_words.update(custom_stopwords)
filtered_tokens2 = [word for word in tokens if word.lower() not in stop_words]
lemmatized = [lemmatizer.lemmatize(word) for word in filtered_tokens2]
word_counts = Counter(lemmatized)
top10 = word_counts.most_common(10)
words = [w for w, c in top10]
counts = [c for w, c in top10]
wordcloud = WordCloud(width=800, height=400).generate(" ".join(lemmatized))

print("Liczba słów po tokenizacji:", len(tokens))
print("Liczba słów po usunięciu stopwords:", len(filtered_tokens))
print("Liczba słów po dodatkowym filtrowaniu:", len(filtered_tokens2))
print("Liczba słów po lematyzacji:", len(lemmatized))

plt.bar(words, counts)
plt.xticks(rotation=45)
plt.xlabel("Słowa")
plt.ylabel("Liczba wystąpień")
plt.title("Top 10 słów")
plt.show()

plt.imshow(wordcloud)
plt.axis("off")
plt.show()