function even(input){
  let prev = 1;
  let current = 1;
  let sum = 0;
  for(let i = prev; i < input; i++){
    let next = prev + current
    if( next % 2 === 0 ){
      sum += next;
    }
    prev = current;
    current = next;

    }
  return sum;
}
