function sum(array) {
  const sum = array.reduce((previousValue, currentValue) => {
    return previousValue + currentValue;
  }, 0);
  return sum;
}

function mean(array) {
  return sum(array) / array.length;
}
export default { sum, mean };
