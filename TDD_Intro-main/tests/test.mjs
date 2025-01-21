
function test(description) {

    console.log(description);

    return {
        isEqual,
        dosNotThrowError
    }
}

function dosNotThrowError(testFunction, description) {

    try {
        testFunction();
        console.log(`🟢 ${description}`);
    } catch (error) {
        console.log(error);
        console.log(`🔴 ${description}`)
    }

}


function isInRange(recived, expectedLowerBound, expectedUpperBound, description) {

    if (recived >= expectedLowerBound && recived <= expectedUpperBound) {
        console.log(`🟢 ${description}`);
    } else {
        console.log(`🔴 ${description}. Expected ${expected}, recived ${recived}`);
    }

}

function isEqual(recived, expected, description) {

    if (recived === expected) {
        console.log(`🟢 ${description}`);
    } else {
        console.log(`🔴 ${description}. Expected ${expected}, recived ${recived}`);
    }

}

export default test