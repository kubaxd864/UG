import scala.util.control.Breaks._

@main def zadania(): Unit = {
  println(parzysta(5))
  println(nwd(2, 4))
  println(pierwsza(5))
  hipoteza(3)
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
  if(n >= 2)
    !(2 until n).exists(i => n % i == 0)
  else
    false
}

def hipoteza(n: Int): Unit = {
  breakable {
    for (i <- 2 to n) {
      if (pierwsza(i) && pierwsza(n - i)) {
        println(s"$n == $i + ${n - i}")
        break
      }
    }
    println("Nie udało się znaleźć dwóch liczb pierwszych będących sumą " + n)
  }
}

