@main def pierwszy_program(): Unit = {
  println(subseq(List(1, 3, 4, 6, 7, 9, 11, 19, 12, 1, 1), 2, 5))
  println(pairPosNeg(List(2.4, 3.1, 5.2, 9.0, 6.1, 5.4, 7.8, 3.1, -4.1, 0.0)))
  println(deStutter(List(1, 1, 2, 4, 4, 4, 1, 3)))
  println(remElems(List(1, 1, 2, 4, 4, 4, 1, 3), 3))
  println(freqMax(List(1, 3, 4, 6, 7, 9, 11, 19, 12, 0)))
}

def subseq[A](list: List[A], begIdx: Int, endIdx: Int): List[A] = {
    return list.take(endIdx + 1).drop(begIdx)
}

def pairPosNeg(list: List[Double]): (List[Double], List[Double]) = {
    list.filter(x=>{x != 0.0}).partition(x=>{x > 0})
}

def deStutter[A](list: List[A]): List[A] = {
    list.foldLeft(List.empty[A]) { (akum, el) =>
        if (akum.isEmpty || akum.last != el) akum :+ el
        else akum
    }
}

def remElems[A](list: List[A], k: Int): List[A] = {
    return list.zipWithIndex.filter((el, index) => index != k).map(_._1)
}

def freqMax[A](list: List[A]): (Set[A], Int) = {
    val freqMap = list.groupBy(identity).view.mapValues(_.size).toMap
    val maxFreq = freqMap.values.max
    val maxElems = freqMap.filter { case (_, freq) => freq == maxFreq }.keys.toSet
    (maxElems, maxFreq)
}