let table = [1, 5, 10]
table = table.sort(function(a, b){return a-b});
for(i = 0; i < table.length; i++){
    if(table[i] <= 0){
        console.log('Jedna z liczb nie jest parzysta');
    }
}
max = table[table.length - 1];
b1 = table[0];
b2 = table[1];
if(b1 + b2 < max){
    console.log("Nie można zbudować trójkąta");
} else {
    console.log("Można zbudować trójkąt");
}