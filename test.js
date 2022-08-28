const arr = [12, 13, 14, 15, 16, 17, 18, 19, 20, 21];

function getBeforeAfter(arr, index, count) {
  let start = index - count - 1;
  if (start < 0) start = 0;

  let end = index + count;

  return arr.slice(start, end);
}

console.log(getBeforeAfter(arr, 17, 3));
