error id: scala/collection/StrictOptimizedIterableOps#unzip().
file:///C:/Users/x/Desktop/Projects/Github/UG%20-%20Gitlab/Język%20Programowania%201/sobczyk-jakub/lab07/src/main/scala/Main.scala
empty definition using pc, found symbol in pc: scala/collection/StrictOptimizedIterableOps#unzip().
empty definition using semanticdb
empty definition using fallback
non-local guesses:
	 -list/unzip.
	 -list/unzip#
	 -list/unzip().
	 -scala/Predef.list.unzip.
	 -scala/Predef.list.unzip#
	 -scala/Predef.list.unzip().
offset: 359
uri: file:///C:/Users/x/Desktop/Projects/Github/UG%20-%20Gitlab/Język%20Programowania%201/sobczyk-jakub/lab07/src/main/scala/Main.scala
text:
```scala
@main def pierwszy(): Unit = {
  println(sumOpts(List(Some(1.2), Some(-2.4), Some(6.3), Some(2.3), Some(9.0), Some(1.8), None)))
  println(position(List(1, 5, 4, 7, 8, 9), 4))
  println(indices(List(1, 5, 4, 7, 8, 9), 4))
  // println(swap(List(1, 5, 4, 7, 8, 9)))
  val l = List(1, 5, 4, 7, 8, 9)
  val list = l.zipWithIndex
  val unziped = list.unzip@@
  print(list)
}

def sumOpts(l: List[Option[Double]]): Option[Double] = {
  val sum = l.foldLeft(0.0) {
    case (akum, Some(value)) => akum + value
    case (akum, None) => akum
  }
  if (sum == 0.0) None else Some(sum)
}

def position[A](l: List[A], el: A): Option[Int] = {
  if l.indexOf(el) == -1 then None
  else Some(l.indexOf(el)) 
}

def indices[A](l: List[A], el: A): Set[Int] = {
    l.zipWithIndex.collect {
    case (e, index) if e == el => index
  }.toSet
}

// def swap[A](l: List[A]): List[A] = {
    
// }
```


#### Short summary: 

empty definition using pc, found symbol in pc: scala/collection/StrictOptimizedIterableOps#unzip().