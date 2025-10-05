@main def pierwszy(): Unit = {
  println(s"Odwrócony String: ${reverse("Kot")}")
  println(s"Czy liczba ${1} jest pierwsza: ${pierwsza(2)}")
  println(s"${4} element ciągu wynosi: ${ciąg(0)}")
  println(s"Połączone i posortowane listy: ${tasuj(List(1,6,3,8,2,5),List(2,5,0,1,3))}")
}

def reverse(str: String): String = {
  @annotation.tailrec
  def helper(str: String, acc: String = ""): String = {
    if (str.isEmpty) acc
    else helper(str.tail, str.head.toString + acc)
  }
  helper(str)
}

def pierwsza(n: Int): Boolean = {
  if (n <= 1) false
  else {
    @annotation.tailrec
    def helper(acc: Int): Boolean = {
      if (acc == 1) true
      else if (n % acc == 0) false
      else helper(acc - 1)
    }
    helper(n - 1)
  }
}

def ciąg(n: Int): Int = {
  @annotation.tailrec
  def helper(n: Int, a: Int, b: Int): Int = {
    if (n == 0) a 
    else if (n == 1) a - 1
    else helper(n - 1, b, a + b)
  }
  helper(n, 2, 1)
}

def tasuj(l1: List[Int], l2: List[Int]): List[Int] = {
  @annotation.tailrec
  def helper(l1: List[Int], l2: List[Int], acc: List[Int]): List[Int] = (l1, l2) match {
    case (Nil, Nil) => acc.reverse
    case (Nil, h2 :: t2) => helper(Nil, t2, if (acc.headOption.contains(h2)) acc else h2 :: acc)
    case (h1 :: t1, Nil) => helper(t1, Nil, if (acc.headOption.contains(h1)) acc else h1 :: acc)
    case (h1 :: t1, h2 :: t2) =>
      if (h1 < h2) helper(t1, l2, if (acc.headOption.contains(h1)) acc else h1 :: acc)
      else if (h1 > h2) helper(l1, t2, if (acc.headOption.contains(h2)) acc else h2 :: acc)
      else helper(t1, t2, if (acc.headOption.contains(h1)) acc else h1 :: acc)
  }
  helper(l1, l2, Nil)
}