const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const getRandomString = (sourceChars: Array<string>, count: number) => {
  if (count <= 0 || sourceChars.length === 0) {
    return "";
  }

  let result = "";

  for (let i = 0; i < count; i += 1) {
    result += sourceChars[randomInt(0, sourceChars.length - 1)];
  }

  return result;
};
