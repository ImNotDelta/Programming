/*
    NB! There is absolutely no point to these tasks if you use AI or "google" to solve them.
    The point is to learn and practice, not to get the perfect answer.
*/

/* Task 1
    Declare two variables, set the value of the first variable to 1 and the value of the second to 2.
    Now swap so the first variable gets the value of the second and vice versa.
*/
let variableA = 1;
let variableB = 2;

[variableA, variableB] = [variableB, variableA];
console.log(variableA, variableB);

/* Task 2
    Without using built-in Math functionality or constants in JavaScript.
    Calculate the area of a circle with the radius 6.
*/
const pi = 3.14;
const radius = 6;

console.log(pi*radius*radius);

/* Task 3
    Given the two strings "If at first you do not succeed, try, try again" and "Fall seven times, stand up eight".
    Create a variable that contains all the letters that are in both strings but only once and in alphabetical order.
    Consider 'A' and 'a' the same letter.
*/

function uniqueLetters(str1, str2) {
    let combined = (str1 + str2).toLowerCase();
    let unique = [];

    for (let i = 0; i < combined.length; i++) {
        let char = combined[i];
        if (char >= 'a' && char <= 'z'&& !unique.includes(char)) {
            if (str1.includes(char) && str2.includes(char)) {
                unique.push(char);
            }
        }
    }

    for (let i = 0; i < unique.length - 1; i++) {
        for (let j = i; j < unique.length; j++) {
            if (unique[i] < unique[j]) {
                let temp = unique[i];
                unique[i] = unique[j];
                unique[j] = temp;
            }
        }
    }
    return unique.join('');
}

console.log(uniqueLetters("If at first you do not succeed, try, try again","Fall seven times, stand up eight"));

/* Task 4
    Declare three variables. The first two should have the values 6 and 2.
    Make it so that the third variable is 10.
*/
const variableC = 6;
const variableD = 2;
const variableE = variableC + variableD + variableD;

console.log(variableE);

/* Task 5
    Given a variable set to a random floating point value (you pick the value).
    Instantiate a second variable that is true if the first variable is greater than 22.34.
*/
const variableF = 23;
const variableG = variableF > 22.34;

console.log(variableG);

/* Task 6
    Given the string "Life is short. Smile while you still have teeth." and the string "The best therapy is a good laugh and great friends.".
    Create a new variable that is the intersection of words between the two strings.
    Create a new variable that is the union of words between the two strings.
*/
function findWordsIntersectionUnion(str1, str2) {
    function getWord(str) {
        let words = [];
        let word = '';

        for (let i = 0; i < str.length; i++) {
            if(str[i] !== ' ' && str[i] !== '.' && str[i] !== ',') {
                word += str[i];
            } else if (word !== '') {
                words.push(word);
                word = '';
            }
        }

        if (word !== '') word.push(word);
        return words;
    }

    let words1 = getWord(str1);
    let words2 = getWord(str2);

    let intersection = [];
    let union = [...words1];

    for (let i = 0; i <words2.length; i++) {
        if (words1.includes(words2[i]) && !intersection.includes(words2[i])) {
        }
        if (!union.includes(words2[i])) {
            union.push(words2[i]);
        }
    }

    return { intersection, union };
}

console.log(findWordsIntersectionUnion(
    "Life is short. Smile while you still have teeth.", 
    "The best therapy is a good laugh and great friends."
));
