error id: `<none>`.
file:///C:/Users/x/Desktop/Projects/Github/UG%20-%20Gitlab/Język%20Programowania%201/sobczyk-jakub/lab02/src/main/scala/Main.scala
empty definition using pc, found symbol in pc: `<none>`.
empty definition using semanticdb
|empty definition using fallback
non-local guesses:
	 -

Document text:

```scala
@main def zadania(): Unit = {
  println(parzysta(5))
  println(nwd(2, 4))
  println(pierwsza(4))
}

def parzysta(n: Int): Boolean = {
  if(n % 2 == 0)
    true
  else
    false
}

def nwd(a: Int, b: Int): Int = {
  if(a * b == 0)
    a + b
  else 
    if(a >= b)
      nwd(a % b, b)
    else 
      nwd(a, b % a)
}

def pierwsza(n: Int): Boolean = {
  if(n < 2) 
    false
  else 
    true
}
```

#### Short summary: 

empty definition using pc, found symbol in pc: `<none>`.