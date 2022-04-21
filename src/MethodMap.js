import { TokenEnum } from "./TokenEnum.js";

const methodMap = new Map();

methodMap.set(TokenEnum.OUTPUT.value, (value) => {
  console.log(...value);
});

methodMap.set(TokenEnum.MAX.value, (value) => {
  return Math.max(...value);
});

export { methodMap };
