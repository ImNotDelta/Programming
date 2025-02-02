
import divide from "../divide.mjs";

const v = 2 / Number.MAX_VALUE;

console.log(BigInt);
console.log(v);

if (divide(Number.MAX_VALUE).toFixed(4) === v.toFixed(4)) {
    console.log(`🟢 divide by LARG number`);
} else {
    console.log(`🔴 divide by LARG number`);
}

try {
    divide(0);
    console.log(`🔴 divide by 0`);
} catch (e) {
    console.log(`🟢 divide by 0`);
}

if (isNaN(divide("c"))) {
    console.log(`🟢 divide by char`);
} else {
    console.log(`🔴 divide by char`);
}

if (divide != undefined) {
    console.log(`🟢 divide defined`);
} else {
    console.log(`🔴 divide not defined`);
}

if (divide(2) === 1) {
    console.log(`🟢 divide by 2`);
} else {
    console.log(`🔴 divide by 2`);
}

if (divide(1) === 2) {
    console.log(`🟢 divide by 1`);
} else {
    console.log(`🔴 divide by 1`);
}
