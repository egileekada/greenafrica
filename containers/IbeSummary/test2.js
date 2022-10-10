function solution(X, B, Z) {
  const downloadedBytes = B.reduce((sum, _a) => sum + _a, 0);
  const remBytes = X - downloadedBytes;
  const timeAvg = (B[B.length - 1] + B[B.length - 2]) / Z;
  let res;

  if (remBytes > 1) {
    res = Math.ceil(remBytes / timeAvg);
  } else if (remBytes === 0) {
    res = 0;
  } else {
    res = -1;
  }
  return res;
}

function solution(S, B) {
  const sortedArr = [...B].sort((a, b) => {
    return b - a;
    // if(a > b) return 1;
    // if(a < b) return -1;
    // return 0;
  });
  const sumArr = B.reduce((sum, _a) => sum + Number(_a), 0);
  let returnObj = {};

  for (i = sortedArr.length - 1; i >= 0; i--) {
    let _i = B.indexOf(sortedArr[i]);
    let computed = (S * sortedArr[i]) / sumArr;

    computed =
      i === 0
        ? Math.ceil(computed * 100) / 100
        : Math.floor(computed * 100) / 100;
    returnObj[_i] = String(computed.toFixed(2));
  }

  // console.log(sortedArr)
  // console.log(sumArr)
  console.log(Object.values(returnObj));

  return Object.values(returnObj);
}
