error id: file:///C:/Users/x/Desktop/Projects/Github/UG/Java/zadanie-04-rynek-kubaxd864/Bank.java:_empty_/InflationListener#
file:///C:/Users/x/Desktop/Projects/Github/UG/Java/zadanie-04-rynek-kubaxd864/Bank.java
empty definition using pc, found symbol in pc: _empty_/InflationListener#
empty definition using semanticdb
empty definition using fallback
non-local guesses:

offset: 197
uri: file:///C:/Users/x/Desktop/Projects/Github/UG/Java/zadanie-04-rynek-kubaxd864/Bank.java
text:
```scala
import java.util.ArrayList;
import java.util.List;

public class Bank {

    private List<Observer> listeners = new ArrayList<>();
    private double inflation = 0.02;

    public void register(Inf@@lationListener l) {
        listeners.add(l);
    }

    public void nextTurn(double marketVolume) {
        inflation = inflation * (1 + 0.01 - marketVolume * 0.0001);

        listeners.forEach(l -> l.onInflationChanged(inflation));
    }

    public double getInflation() {
        return inflation;
    }

    public void shock(double percent) {
        inflation *= (1 + percent);
    }
}
```


#### Short summary: 

empty definition using pc, found symbol in pc: _empty_/InflationListener#