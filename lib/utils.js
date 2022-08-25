export const capitalizeWord = (value) => {
  return value && value.charAt(0).toUpperCase() + value.slice(1);
};

export const capitalizeFirstLetter = (text) => {
  return text ? text.charAt(0).toUpperCase() + text.slice(1) : "";
};

export const sumValues = (obj) =>
  Object.keys(obj).length > 0 && Object.values(obj).reduce((a, b) => a + b);

export default function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
  });
}

export const isInThePast = (date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(date) < today;
};
`1`;

export const capitalizeName = function (name) {
  let result = "";
  if (name) {
    const names = name.split(" ");
    const nameUpper = [];

    for (const word of names) {
      const wordDone =
        word.length > 0 ? word.replace(word[0], word[0].toUpperCase()) : "";
      nameUpper.push(wordDone);
    }

    // for (const word of names) {
    //   const wordDone =
    //     word.length > 0 ? word.charAt(0).toUpperCase() + word.slice(1) : "";
    //   nameUpper.push(wordDone);
    // }

    result = nameUpper.join(" ");
  } else {
    result = "";
  }

  return result;
};
