export default function isEqual(firstObj, secondObj) {
  const propsFirstObject = Object.getOwnPropertyNames(firstObj);
  const propsSecondObject = Object.getOwnPropertyNames(secondObj);

  if (propsFirstObject.length !== propsSecondObject.length) {
    return false;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const prop of propsFirstObject) {
    const bothAreObjects =
      typeof firstObj[prop] === "object" && typeof secondObj[prop] === "object";

    if (
      (!bothAreObjects && firstObj[prop] !== secondObj[prop]) ||
      (bothAreObjects && !isEqual(firstObj[prop], secondObj[prop]))
    ) {
      return false;
    }
  }

  return true;
}
