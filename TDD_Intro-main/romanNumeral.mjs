// Decimal to Roman Numeral converter 

function romanNumeralConverter(nInt) {

    let output = "";
    while (nInt > 0) {
        let diff = 0;

        if (nInt >= 1000) {
            output += "M";
            diff = 1000;
        }
        else if (nInt >= 900) {
            output += "CM";
            diff = 900;
        }
        else if (nInt >= 500) {
            output += "D";
            diff = 500;
        }
        else if (nInt >= 400 ) {
            output += "CD";
            diff = 400;
        }
        else if (nInt >= 100 ) {
            output += "C";
            diff = 100;
        }
        else if (nInt >= 90 ) {
            output += "XC";
            diff = 90;
        }
        else if (nInt >= 50 ) {
            output += "L";
            diff = 50;
        }
        else if (nInt >= 40 ) {
            output += "XL";
            diff = 40;
        }
        else if (nInt >= 10 ) {
            output += "X";
            diff = 10;
        }
        else if (nInt == 9 ) {
            output += "IX";
            diff = 9;
        }
        else if (nInt >= 7 ) {
            output += "VII";
            diff = 7;
        }
        else if (nInt >= 5 ) {
            output += "V";
            diff = 5;
        }
        else if (nInt == 4 ) {
            output += "IV";
            diff = 4;
        }
        else if (nInt < 4 ) {
            output += "I";
            diff = 1;
        }
        
        nInt -= diff;
    }

    return output;

}

export default romanNumeralConverter