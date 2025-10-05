function loop(n){
    if(n < 0){
        console.log("Liczba jest ujemna");
        if(n % 2 == 0){
            console.log("Liczba jest parzysta");
        } else {
            console.log("Liczba jest nieparzysta");
        }
    } else {
        console.log("Liczba jest dodatnia");
        if(n % 2 == 0){
            console.log("Liczba jest parzysta");
        } else {
            console.log("Liczba jest nieparzysta");
        }
    }
}

loop(-2)