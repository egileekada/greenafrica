const arr =
  "https://dev-ibe.gadevenv.com/?%20%20%20%20%20%20%20%20%20origin=ABV%20%20%20%20%20%20%20%20%20&destination=ABV%20%20%20%20%20%20%20%20%20&departure=2022-08-30%20&adt=1&chd=0&inf=0";

console.log(arr.replace(/%20/g, ""));
