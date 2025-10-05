function cut_String(str, func) {
  return func(str.split(" "));
}

function return_result(val) {
  console.log("Pocięty String: " + val);
}

cut_String("Ala ma kota", return_result);
