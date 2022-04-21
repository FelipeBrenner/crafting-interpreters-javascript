import { TokenEnum } from "./TokenEnum.js";

const methodMap = new Map();

methodMap.set(TokenEnum.OUTPUT.value, (value) => value);

export { methodMap };
