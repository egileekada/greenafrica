const capitalizeName = function (name) {
  let result = "";
  if (name) {
    const names = name.split(" ");
    const nameUpper = [];

    for (const word of names) {
      const wordDone = word.replace(word[0], word[0].toUpperCase());
      nameUpper.push(wordDone);
    }
    result = nameUpper.join(" ");
  } else {
    result = "";
  }

  return result;
};

const r = capitalizeName("paul ifeoluwa fadayo");
const r2 = capitalizeName("olabamipe Taiwo");

console.log(r);
console.log(r2);
