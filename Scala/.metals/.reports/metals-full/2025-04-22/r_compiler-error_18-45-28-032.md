file:///C:/Users/x/Desktop/Projects/Github/UG%20-%20Gitlab/Język%20Programowania%201/sobczyk-jakub/lab07/src/main/scala/Main.scala
### java.nio.file.InvalidPathException: Illegal char <:> at index 3: jar:file:///C:/Program%20Files/Java/jdk-23/lib/src.zip!/java.base/java/lang/String.java

occurred in the presentation compiler.

presentation compiler configuration:


action parameters:
offset: 359
uri: file:///C:/Users/x/Desktop/Projects/Github/UG%20-%20Gitlab/Język%20Programowania%201/sobczyk-jakub/lab07/src/main/scala/Main.scala
text:
```scala
@main def pierwszy(): Unit = {
  println(sumOpts(List(Some(1.2), Some(-2.4), Some(6.3), Some(2.3), Some(9.0), Some(1.8), None)))
  println(position(List(1, 5, 4, 7, 8, 9), 4))
  println(indices(List(1, 5, 4, 7, 8, 9), 4))
  println(swap(List(1, 5, 4, 7, 8, 9)))
  val strefy = java.util.TimeZone.getAvailableIDs.toList
  val europe = strefy.map {
    c@@
  }
  val lista = List("tok", "kot", "ala", "pies", "zebra", "słoń")
  val posortowana = lista.sorted.sortBy(_.length)
  println(posortowana)
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
```



#### Error stacktrace:

```
java.base/sun.nio.fs.WindowsPathParser.normalize(WindowsPathParser.java:204)
	java.base/sun.nio.fs.WindowsPathParser.parse(WindowsPathParser.java:175)
	java.base/sun.nio.fs.WindowsPathParser.parse(WindowsPathParser.java:77)
	java.base/sun.nio.fs.WindowsPath.parse(WindowsPath.java:92)
	java.base/sun.nio.fs.WindowsFileSystem.getPath(WindowsFileSystem.java:231)
	java.base/java.nio.file.Path.of(Path.java:148)
	java.base/java.nio.file.Paths.get(Paths.java:69)
	scala.meta.io.AbsolutePath$.apply(AbsolutePath.scala:58)
	scala.meta.internal.metals.MetalsSymbolSearch.$anonfun$definitionSourceToplevels$2(MetalsSymbolSearch.scala:70)
	scala.Option.map(Option.scala:242)
	scala.meta.internal.metals.MetalsSymbolSearch.definitionSourceToplevels(MetalsSymbolSearch.scala:69)
	dotty.tools.pc.completions.CaseKeywordCompletion$.dotty$tools$pc$completions$CaseKeywordCompletion$$$sortSubclasses(MatchCaseCompletions.scala:342)
	dotty.tools.pc.completions.CaseKeywordCompletion$$anon$1.applyOrElse(MatchCaseCompletions.scala:218)
	dotty.tools.pc.completions.CaseKeywordCompletion$$anon$1.applyOrElse(MatchCaseCompletions.scala:114)
	scala.PartialFunction$Lifted.apply(PartialFunction.scala:338)
	scala.PartialFunction$Lifted.apply(PartialFunction.scala:334)
	scala.Option.collect(Option.scala:462)
	dotty.tools.pc.completions.CaseKeywordCompletion$.contribute(MatchCaseCompletions.scala:248)
	dotty.tools.pc.completions.Completions.advancedCompletions(Completions.scala:409)
	dotty.tools.pc.completions.Completions.completions(Completions.scala:122)
	dotty.tools.pc.completions.CompletionProvider.completions(CompletionProvider.scala:135)
	dotty.tools.pc.ScalaPresentationCompiler.complete$$anonfun$1(ScalaPresentationCompiler.scala:150)
```
#### Short summary: 

java.nio.file.InvalidPathException: Illegal char <:> at index 3: jar:file:///C:/Program%20Files/Java/jdk-23/lib/src.zip!/java.base/java/lang/String.java