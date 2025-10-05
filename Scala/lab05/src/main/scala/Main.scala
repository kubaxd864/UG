@main def pierwszy(): Unit = {
  val lte = (m: Int, n: Int) => m <= n
  val lista = List(1, 2, 2, 5)
  val f = (n: Int) => n + 3
  println(applyForAll(f)(lista))
  println(isOrdered(lte)(lista)) 
  println(oczyść(List(1, 1, 2, 4, 4, 4, 1, 3)))
  println(skompresuj(List('a', 'a', 'b', 'c', 'c', 'c', 'a', 'a', 'b', 'd')))
}

def oczyść[A](l: List[A]): List[A] = {
  @annotation.tailrec
  def helper[A](l: List[A], akum: List[A]): List[A] = l match {
    case Nil => akum.reverse
    case h1 :: Nil => helper(Nil, h1 :: akum) 
    case h1 :: h2 :: t if h1 == h2 => helper(h2 :: t, akum)
    case h1 :: h2 :: t => helper(h2 :: t, h1 :: akum) 
  }
  helper(l, Nil)
}

def skompresuj[A](l: List[A]): List[(A, Int)] = {
  @annotation.tailrec
  def helper[A](l: List[A], akum: List[(A, Int)]): List[(A, Int)] = l match{
    case Nil => akum.reverse
    case h :: t => { akum match
      case (el, count) :: tail if el == h => helper(t, (el, count + 1) :: tail)
      case _ => helper(t, (h, 1) :: akum)
    }
  }
  helper(l, Nil)
}

def isOrdered[A](leq: (A, A) => Boolean)(l: List[A]): Boolean = {
    @annotation.tailrec
    def helper(l: List[A]): Boolean = l match{
      case Nil => true
      case _ :: Nil => true
      case h1 :: h2 :: t if leq(h1, h2) => helper(h2 :: t)
      case _ => false 
    }
    helper(l)
}

def applyForAll[A, B](f: A => B)(l: List[A]): List[B] = {
    @annotation.tailrec
    def helper(l: List[A], akum: List[B]): List[B] = l match {
      case Nil => akum.reverse
      case h :: t => helper(t, f(h) :: akum)
    }
    helper(l, Nil)
}