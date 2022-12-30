// // // var counter = (function () {
// // //   var i = 0;

// const { number } = require("yup");

// // //   return {
// // //     get: function () {
// // //       return i;
// // //     }
// // //     set: function
// // //   }
// // // })

// // const solution = (transactions, taxRate) => {
// //   let numCalls = 0;

// //   const calculateCostAfterTax = (cost, taxRate) => {
// //     numCalls = numCalls + 1;
// //     return cost * taxRate;
// //   };

// //   const computeTotal = (taxRate) => {
// //     const treated = [];
// //     return (cost) => {
// //       if (treated.includes(cost)) {
// //         return;
// //       } else {
// //         treated.push(cost);
// //         return calculateCostAfterTax(cost, taxRate);
// //       }
// //     };
// //   };

// //   transactions.map(computeTotal(taxRate));
// //   return numCalls;
// // };

// // // const _transactions = [10, 24, 12, 8, 10, 24];
// // // const _tax = 1.2;

// // const _transactions = [10, 5, 10, 5];
// // const _tax = 1.1;

// // const _soln = solution(_transactions, _tax);
// // console.log("_soln", _soln);

// // function findStep(n) {
// //   if (n == 0) return 1;
// //   else if (n < 0) return 0;
// //   else return findStep(n - 3) + findStep(n - 2) + findStep(n - 1);
// // }

// // console.log("_soln", findStep(3));

// function areDistinct(str, i, j) {
//   var visited = new [26]();
//   for (var k = i; k <= j; k++) {
//     if (visited[str.charAt(k) - "a"] == true) return false;
//     visited[str.charAt(k) - "a"] = true;
//   }
//   return true;
// }

// function longestUniqueSubsttr(str) {
//   var n = str.length;
//   var res = 0;
//   for (var i = 0; i < n; i++)
//     for (var j = i; j < n; j++)
//       if (areDistinct(str, i, j)) res = Math.max(res, j - i + 1);

//   return res;
// }

// function lengthOfLongestSubstring(check) {
//   var letters = check.split("");
//   var max = 0;
//   var result = new Map();
//   var start = 0;

//   for (var i = 0; i < letters.length; i++) {
//     if (!result.has(letters[i])) {
//       result.set(letters[i], i);
//     } else {
//       i = result.get(letters[i]);
//       result.clear();
//     }

//     if (max < result.size) {
//       max = result.size;
//     }
//   }
//   return max;
// }

// var len = lengthOfLongestSubstring("nndNfdfdf");

// console.log("len", len);

// const bar = () => console.log("bar");
// const baz = () => console.log("baz");

// const foo = () => {
//   console.log('foo')
//   setTimeout(bar,0)
//   baz()
// }

// foo()

// var num = 24;
// setTimeout(() => {
//   console.log(num)
// }, 0)

// num = 5

// console.log(!!(true && true));
// console.log(!!(true && false));
// console.log(!!(true || false));

function checkIfDuplicateExists(arr) {
  return new Set(arr).size !== arr.length;
}

var arr = ["mrs ola kehinde", "mrs ola kehinde"];
let duplicateExist = checkIfDuplicateExists(arr);
console.log("dupliacte",duplicateExist);
