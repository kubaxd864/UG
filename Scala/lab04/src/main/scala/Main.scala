@main def pierwszy(): Unit = {
  println(sumuj(List(Some(1.0), Some(2.5), Some(3.3))))
  println(maksimum(List(1.0, 3.2, 6.4, 2.1),List(5.5, 3.4, 4.6, 1.2, 1.8)))
  println(usun(List(2, 1, 4, 1, 3, 3, 1, 2), 1))
  println(divide(List(2, 1, 5, 2, 8, 3, 0, 2, 9, 8)))
}

def sumuj(l: List[Option[Double]]): Option[Double] = {
  @annotation.tailrec
  def helper(l: List[Option[Double]], akum: Double): Option[Double] = l match {
    case Nil => if (akum > 0) Some(akum) else None
    case Some(d) :: tl if d > 0 => helper(tl, akum + d)
    case _ :: tl => helper(tl, akum)
  }
  helper(l, 0.0)
}

def maksimum(l1: List[Double], l2: List[Double]): List[Double] = {
  @annotation.tailrec
  def helper(l1: List[Double], l2: List[Double], akum: List[Double]): List[Double] = (l1, l2) match {
    case (Nil, Nil) => akum.reverse
    case (Nil, h2 :: t2) => helper(Nil, t2, h2 :: akum)
    case (h1 :: t1, Nil) => helper(t1, Nil, h1 :: akum)
    case (h1 :: t1, h2 :: t2) =>
      if (h1 > h2) helper(t1, t2, h1 :: akum)
      else helper(t1, t2, h2 :: akum)
  }
  helper(l1, l2, Nil)
}

def usun[A](l: List[A], el: A): List[A] = {
    @annotation.tailrec
    def helper(l: List[A], akum: List[A]): List[A] = l match {
      case Nil => akum.reverse
      case h :: t if h == el => helper(t, akum)
      case h :: t => helper(t, h :: akum)
    }
    helper(l, Nil)
}

def divide[A](l: List[A]): (List[A], List[A]) = {
    @annotation.tailrec
    def helper(l: List[A], l1: List[A], l2: List[A], toggle: Boolean): (List[A], List[A]) = l match{
      case Nil => (l1.reverse, l2.reverse)
      case h :: t =>  {
        if (toggle) helper(t, h :: l1, l2, false)
        else helper(t, l1, h :: l2, true)
      }
    }
    helper(l, Nil, Nil, true)
}

type Pred[X] = X => Boolean

def or[X](p1: Pred[X], p2: Pred[X]): Pred[X] = {
    x => p1(x) || p2(x)
}

def not[X](p1: Pred[X]): Pred[X] = {
    x => !p1(x)
}

def imp[X](p1: Pred[X], p2: Pred[X]): Pred[X] = {
    x => !p1(x) || p2(x)
}