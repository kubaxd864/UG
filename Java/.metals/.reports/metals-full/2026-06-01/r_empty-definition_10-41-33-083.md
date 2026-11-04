error id: file:///C:/Users/x/Desktop/Projects/Github/UG/Java/zadanie-04-rynek-kubaxd864/Market.java:java/util/List#
file:///C:/Users/x/Desktop/Projects/Github/UG/Java/zadanie-04-rynek-kubaxd864/Market.java
empty definition using pc, found symbol in pc: java/util/List#
empty definition using semanticdb
empty definition using fallback
non-local guesses:

offset: 146
uri: file:///C:/Users/x/Desktop/Projects/Github/UG/Java/zadanie-04-rynek-kubaxd864/Market.java
text:
```scala
package simulation;

import actors.*;
import model.Offer;

import java.util.ArrayList;
import java.util.List;

public class Market {

    private @@List<Seller> sellers = new ArrayList<>();
    private List<Buyer> buyers = new ArrayList<>();

    public List<Offer> collectOffers() {
        List<Offer> all = new ArrayList<>();
        sellers.forEach(s -> all.addAll(s.getOffers()));
        return all;
    }

    public double executeTrades() {
        List<Offer> offers = collectOffers();

        buyers.forEach(b -> b.buy(offers));

        return offers.stream()
                .mapToDouble(o -> o.getPrice())
                .sum();
    }

    public List<Seller> getSellers() { return sellers; }
    public List<Buyer> getBuyers() { return buyers; }
}
```


#### Short summary: 

empty definition using pc, found symbol in pc: java/util/List#