error id: file:///C:/Users/x/Desktop/Projects/Github/UG/Java/zadanie-03-koszyk-gr-1-kubaxd864/Promotion.java:
file:///C:/Users/x/Desktop/Projects/Github/UG/Java/zadanie-03-koszyk-gr-1-kubaxd864/Promotion.java
empty definition using pc, found symbol in pc: 
empty definition using semanticdb
empty definition using fallback
non-local guesses:

offset: 81
uri: file:///C:/Users/x/Desktop/Projects/Github/UG/Java/zadanie-03-koszyk-gr-1-kubaxd864/Promotion.java
text:
```scala
public interface Promotion {
    BasketState apply(BasketState state);
    String@@ name();
}

public static final class BasketState {
    private final List<Product> products;
    private final List<String> gifts;

    public BasketState(List<Product> products, List<String> gifts) {
        this.products = products;
        this.gifts = gifts;
    }

    public List<Product> getProducts() { return products; }
    public List<String> getGifts() { return gifts; }
}

```


#### Short summary: 

empty definition using pc, found symbol in pc: 