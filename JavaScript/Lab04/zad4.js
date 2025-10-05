(function(str) {
    const lengths = str.split(" ").map((e) => e.length);
    console.log(str.split(" ")[lengths.indexOf(Math.max(...lengths))]);
})("Ala ma kota");