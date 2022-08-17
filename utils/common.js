export const timeConvert = (n) => {
  if (n) {
    let num = parseInt(n);
    let hours = num / 60;
    let rhours = Math.floor(hours);
    let minutes = (hours - rhours) * 60;
    let rminutes = Math.round(minutes);
    // return rhours + " hour(s) and " + rminutes + " minute(s).";
    return `${rhours}h ${rminutes}mins`;
  } else {
    return 0;
  }
};
