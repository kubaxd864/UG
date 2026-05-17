import nltk
from nltk.sentiment import SentimentIntensityAnalyzer
from textblob import TextBlob
import text2emotion as te

nltk.download('punkt')
nltk.download('vader_lexicon')

positive_review = "A very pleasant place – clean, well-maintained, and fully consistent with the description. The apartment is tastefully furnished, with a comfortable bed and everything you need for a comfortable stay. The location is also a plus – quiet, yet close to the city center. Communication with the owner was quick and hassle-free. I definitely recommend it and would gladly return again!"
negative_review = "Absolutely everything, from the door lock falling off to the stench of a foul-smelling mop, which unfortunately had to be used because water was leaking from the bathroom all over the room. Upon entering, we felt like we were a cleaning company, completely deprived of cleaning supplies, as the apartment only contained a vacuum cleaner tube, with no appliance. We could only mop the wet floor with a mop, which was impossible to use because it was so smelly from a distance. This meant we had to sleep with the windows open all night in winter. In the morning, there was no tea or coffee, as the kettle and coffee machine simply didn't work. There's absolutely no communication with the person in charge of the apartment. I would never recommend this place!"

sia = SentimentIntensityAnalyzer()
print("=== VADER Results ===")
print("Positive review:", sia.polarity_scores(positive_review))
print("Negative review:", sia.polarity_scores(negative_review))

print("\n=== TextBlob Results ===")
print("Positive review polarity:", TextBlob(positive_review).sentiment.polarity)
print("Negative review polarity:", TextBlob(negative_review).sentiment.polarity)

print("\n=== text2emotion Results ===")
print("Positive review:", te.get_emotion(positive_review))
print("Negative review:", te.get_emotion(negative_review))

