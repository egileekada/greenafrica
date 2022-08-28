let arr = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

function getRange(current) {
  let start = current - 5;
  let end = current + 5;
  let res = [];
  start = start < 0 ? 0 : start;
  for (start; start <= end; start++) {
    res.push(start);
  }
  return res;
}

console.log(getRange(17));

