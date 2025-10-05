@main def pierwszy_program(): Unit = {
  val wynik = obramuj("Ala ma kota")
  print(wynik)
}

def obramuj(napis: String): String = {
  val table = napis.split('\n')
  val maxLength = table.maxBy(s => s.length).length()
  val border = "*" * (maxLength + 4)
  val framedLines = table.map(line => "* " + line.padTo(maxLength, ' ') + " *")
  (border +: framedLines :+ border).mkString("\n")
}