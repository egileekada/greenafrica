import CryptoJS from "crypto-js";
import AES from "crypto-js/aes";

export const capitalizeWord = (value) => {
  return value && value.charAt(0).toUpperCase() + value.slice(1);
};

export const capitalizeFirstLetter = (text) => {
  return text ? text.charAt(0).toUpperCase() + text.slice(1).toLowerCase() : "";
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

export const diff_years = (dt2, dt1) => {
  var diff = (dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60 * 60 * 24;
  return Math.abs(Math.round(diff / 365.25));
};

export const decryptPnr = (encrypted) => {
  var key = CryptoJS.enc.Utf8.parse(process.env.NEXT_PUBLIC_KEY);
  var iv = CryptoJS.enc.Utf8.parse(process.env.NEXT_PUBLIC_IV);

  var decryptedString = AES.decrypt(encrypted, key, {
    iv: iv,
  });

  return CryptoJS.enc.Utf8.stringify(decryptedString);
};

export const encryptPnr = (encrypted) => {
  var key = CryptoJS.enc.Utf8.parse(process.env.NEXT_PUBLIC_KEY);
  var iv = CryptoJS.enc.Utf8.parse(process.env.NEXT_PUBLIC_IV);

  var encrypted = AES.encrypt(encrypted, key, {
    iv: iv,
  });

  return encrypted.toString();
};
