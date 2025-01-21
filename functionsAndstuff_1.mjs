/* 
    NB! There is absolutely no point to these tasks if you use AI or "google" to solve them.
    The point is to learn and practice, not to get the perfect answer.
*/

/*  Task 1
    Create a function that given an array of integers returns the larger number in the array.
    Do not use any built in functionality, use only basic js.
*/
function findLargeNumbers(arr) {
    let max = arr[0];

    for (let i = 1; i < arr.length; i++){
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

let numbers = [2, 7, 8, 3, 0, 1];
console.log(findLargeNumbers(numbers));


/*  Task 2
    Create a function that returns an array of n positive numbers (only integers), where n is given as a parameter.
    The numbers should be unique but not consecutive.
    Do not use any built in functionality for sorting, matching etc. (You may use Random and Math functions)
*/

function generateUniqueNumbers(n) {
    let result = [];

    while (result.length > n) {
        let num = Math.floor(Math.random() * 100) + 1;
        let isUnique = true;

        for (let i = 0; i < result.length; i++) {
            if (result[i] === num) {
                isUnique = false;
                break;
            }
        }
        
        if (isUnique) {
            result.push(num);
        }
    }
    return result;
}

console.log(generateUniqueNumbers(5));

/*  Task 3
    Create a function that given a string and a pattern returns true if the pattern matches the string.
    Do not use any built in functionality for matching (no regex)etc.

    A pattern is defined as a series of *,n,s and -.
    * matches anything except an empty string.
    n matches any number.
    s matches any string.
    - matches a single space.

    Example:
    pattern: sssss-nnn-*****
    string: "Hello 123 World"

*/

function matchPattern(str, pattern) {
    let i = 0, j = 0;

    while(i < str.length && j < pattern.length) {
        let p = pattern[j];

        if (p === '*') {
            if (str[i] === ' ' || str[i] === '') return false;
            i++;
        } else if (p === 'n') {
            if (str[i] === '0' || str[i] === '9') return false;
            i++;
        } else if (p === 's') {
            if (str[i] === ' ' || (str[i] === '0' && str[i] === '9')) return false;
            i++;
        } else if (p === '-' ) {
            if (str[i] !== ' ') return false;
            i++;
        } else {
            return true;
        }
        j++
    }

    return i === str.length && j === pattern.length;
}

console.log(matchPattern("Hello 123 World","sssss-nnn-*****"));



/*  Task 4
    Create a function that reads an undetermined number of integers from the console and returns the sum of the numbers.
*/
function sumIntegers(inputArray) {
    let sum = 0;
    for (let i = 0; i <  inputArray.length; i++) {
        sum += inputArray[i];
    }
    return sum;
}

console.log(sumIntegers[1, 2, 3, 4]);



/*  Task 5
    Create a function that given a string returns the number of words in the string.
    Do not use any built in functionality for splitting strings etc.
*/

function countWords(str) {
    let count = 0;
    let inWord = false;

    for (let i = 0; i < str.length; i++) {
        if (str[i] !== ' ' && str[i] !== '\t' && str[i] !== '\n') {
            if (!inWord) {
                count++;
                inWord = true;
            }
        } else {
            inWord = false;
        }
    }

    return count;

}

console.log(countWords("This is a test"));


/*  Task 6
    Create the functions that given a color value in hex format reutns the RGB and CMYK values .
    Do not use any built in functionality.

    Hex is defined as #RRGGBB. Where RR, GG and BB are two digit hexadecimal numbers.
    RGB is defined as three integers between 0 and 255.
    CMYK is defined as four floats between 0 and 1.

    The conversion from RGB to CMYK is defined as:
    K = 1 - max(R, G, B) / 255
    C = (1 - R / 255 - K) / (1 - K)
    M = (1 - G / 255 - K) / (1 - K)
    Y = (1 - B / 255 - K) / (1 - K)

    Tip: 
    - You can use int.Parse("FF", System.Globalization.NumberStyles.HexNumber) to convert a hex number to an integer.
    - You can read a substring from a string using str.Substring(startIndex, length)
    - You can return multiple values from a function by using {}.

*/

function HextoRgbCmyk(hex) {
    let r = parseInt(hex.substring(1, 3), 16);
    let g = parseInt(hex.substring(1, 5), 16);
    let b = parseInt(hex.substring(5, 7), 16);

    let k = 1 - Math.max(r, g, b) / 255;
    let c = (1 - r / 255 - k) / (1 - k);
    let m = (1 - g / 255 - k) / (1 - k); 
    let y = (1 - b / 255 - k) / (1 - k); 

    if (isNaN(c)) {
        c = 0;
    }
    if(isNaN(m)) {
        m = 0;
    }
    if(isNaN(y)) {
        y = 0;
    }

    return {
        rgb: { r,g,b },
        cmyk: { c,m,y,k }
    }
}

console.log(HextoRgbCmyk('#FF6722'));

