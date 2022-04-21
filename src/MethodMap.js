import { TokenEnum } from "./TokenEnum.js";

const methodMap = new Map();

methodMap.set(TokenEnum.OUTPUT.value, (value) => {
  console.log(...value);
});

methodMap.set(TokenEnum.MAX.value, (value) => {
  return Math.max(...value);
});

methodMap.set(TokenEnum.MIN.value, (value) => {
  return Math.min(...value);
});

methodMap.set(TokenEnum.AVG.value, (value) => {
  const sum = value.reduce((total, currentValue) => total + currentValue, 0);
  return sum / value.length;
});

methodMap.set(TokenEnum.SUM.value, (value) => {
  return value.reduce((total, currentValue) => total + currentValue, 0);
});

export { methodMap };
