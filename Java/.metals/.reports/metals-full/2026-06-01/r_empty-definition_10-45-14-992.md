error id: file:///C:/Users/x/Desktop/Projects/Github/UG/Java/zadanie-04-rynek-kubaxd864/Statistics.java:
file:///C:/Users/x/Desktop/Projects/Github/UG/Java/zadanie-04-rynek-kubaxd864/Statistics.java
empty definition using pc, found symbol in pc: 
empty definition using semanticdb
empty definition using fallback
non-local guesses:

offset: 150
uri: file:///C:/Users/x/Desktop/Projects/Github/UG/Java/zadanie-04-rynek-kubaxd864/Statistics.java
text:
```scala
import java.util.List;

public class Statistics {

    public double avgPrice(List<Offer> offers) {
        return offers.stream().mapToDouble(Offer::@@getPrice).average().orElse(0);
    }

    public double avgBudget(List<Buyer> buyers) {
        return buyers.stream().mapToDouble(Buyer::getBudget).average().orElse(0);
    }
}
```


#### Short summary: 

empty definition using pc, found symbol in pc: 