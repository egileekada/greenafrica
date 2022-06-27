export const capitalizeWord = (value) => {
  return value && value.charAt(0).toUpperCase() + value.slice(1);
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
