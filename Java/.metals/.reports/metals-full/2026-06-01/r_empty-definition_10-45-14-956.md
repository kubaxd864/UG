error id: file:///C:/Users/x/Desktop/Projects/Github/UG/Java/zadanie-04-rynek-kubaxd864/Statistics.java:_empty_/Offer#
file:///C:/Users/x/Desktop/Projects/Github/UG/Java/zadanie-04-rynek-kubaxd864/Statistics.java
empty definition using pc, found symbol in pc: _empty_/Offer#
empty definition using semanticdb
empty definition using fallback
non-local guesses:

offset: 146
uri: file:///C:/Users/x/Desktop/Projects/Github/UG/Java/zadanie-04-rynek-kubaxd864/Statistics.java
text:
```scala
import java.util.List;

public class Statistics {

    public double avgPrice(List<Offer> offers) {
        return offers.stream().mapToDouble(Off@@er::getPrice).average().orElse(0);
    }

    public double avgBudget(List<Buyer> buyers) {
        return buyers.stream().mapToDouble(Buyer::getBudget).average().orElse(0);
    }
}
```


#### Short summary: 

empty definition using pc, found symbol in pc: _empty_/Offer#