function isPositiveEven(number) {
    if(number > 0){
        if(number % 2 == 0){
            console.log("Liczba jest parzysta i większa od 0")
        } else {
            console.log("Liczba jest nieparzysta i większa od 0")
        }
    } else {
        if(number % 2 == 0){
            console.log("Liczba jest parzysta i mniejsza od 0")
        } else {
            console.log("Liczba jest nieparzysta i mniejsza od 0")
        }
    }
}

isPositiveEven(-52)