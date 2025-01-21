
function divide(n) {
    if (n === 0) {
        throw Error("Cant divid by 0");
    }

    if (Number.isNaN(n)) {
        return NaN;
    }

    return 2 / n;
}

export default divide;