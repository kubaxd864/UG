error id: file:///C:/Users/x/Desktop/Projects/Github/UG/Java/zadanie-04-rynek-kubaxd864/Engine.java:_empty_/CentralBank#
file:///C:/Users/x/Desktop/Projects/Github/UG/Java/zadanie-04-rynek-kubaxd864/Engine.java
empty definition using pc, found symbol in pc: _empty_/CentralBank#
empty definition using semanticdb
empty definition using fallback
non-local guesses:

offset: 123
uri: file:///C:/Users/x/Desktop/Projects/Github/UG/Java/zadanie-04-rynek-kubaxd864/Engine.java
text:
```scala
package simulation;

import actors.CentralBank;

public class SimulationEngine {

    private Market market;
    private Ce@@ntralBank bank;

    public SimulationEngine(Market market, CentralBank bank) {
        this.market = market;
        this.bank = bank;
    }

    public void run(int turns) {

        for (int i = 0; i < turns; i++) {

            // 1 inflacja
            bank.nextTurn(0);

            // 2 produkcja
            market.getSellers().forEach(s -> s.nextTurn());

            // 3 handel
            double volume = market.executeTrades();

            // 4 update banku
            bank.nextTurn(volume);
        }
    }
}
```


#### Short summary: 

empty definition using pc, found symbol in pc: _empty_/CentralBank#