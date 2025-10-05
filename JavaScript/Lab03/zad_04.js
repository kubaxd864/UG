function toArray(arg1, arg2) {
    if(Array.isArray(arg1) && Array.isArray(arg2)){
        return[...arg1, ...arg2]
    }
    else if(Array.isArray(arg1)){
        return[...arg1, arg2]
    }
    else if(Array.isArray(arg2)){
        return[arg1,...arg2]
    }
    else {
        return [arg1, arg2]
    }
}

console.log(toArray([1], null))