@main def pierwszy(): Unit = {
  println(sumOpts(List(Some(1.2), Some(-2.4), Some(6.3), Some(2.3), Some(9.0), Some(1.8), None)))
  println(position(List(1, 5, 4, 7, 8, 9), 4))
  println(indices(List(1, 5, 4, 7, 8, 9), 4))
  println(swap(List(1, 5, 4, 7, 8, 9)))
  println(findzones())
  println(freq(List('a','b','a','c','c','a')))
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

def swap[A](l: List[A]): List[A] = {
    l.zipWithIndex.map {
    case (elem, index) if index % 2 == 0 && index + 1 < l.length => l(index + 1)
    case (elem, index) if index % 2 != 0 => l(index - 1)
    case (elem, _) => elem
  }
}

def findzones(): List[String] = {
  val strefy = java.util.TimeZone.getAvailableIDs.toList
  strefy.collect{
    case e if e.startsWith("Europe/") => e.stripPrefix("Europe/")
  }.sorted.sortBy(_.length)
}

def freq[A](l: List[A]): List[(A, Int)] = {
  l.groupBy(e => e).map {
    case (e, v) => (e, v.length)
  }.toList
}