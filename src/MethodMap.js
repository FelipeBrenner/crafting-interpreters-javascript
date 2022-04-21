import { TokenEnum } from "./TokenEnum.js";

const methodMap = new Map()

methodMap.set(TokenEnum.OUTPUT.value, (value) => {
    console.log(value)
});

export {methodMap}