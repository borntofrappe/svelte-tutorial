// function converting the input integer to a roman numeral
// using recursion
export function convertToRoman(num) {
    if (num === 0) {
      return '';
    }
    const combinations = {
      1: 'i',
      2: 'ii',
      3: 'iii',
      4: 'iv',
      5: 'v',
      6: 'vi',
      7: 'vii',
      8: 'viii',
      9: 'ix',
      10: 'x',
      20: 'xx',
      30: 'xxx',
      40: 'xl',
      50: 'l',
      60: 'lx',
      70: 'lxx',
      80: 'lxxx',
      90: 'xc',
      100: 'c',
      200: 'cc',
      300: 'ccc',
      400: 'cd',
      500: 'd',
      600: 'dc',
      700: 'dcc',
      800: 'dccc',
      900: 'cm',
      1000: 'm',
    };

    /* parseInt() can be replaced by converting the strings to integers with the plus sign
    meaning the following two lines achieve the same result

        parseInt(a, 10) > parseInt(b, 10) ? -1 : 1
        +a > +b ? -1 : 1
    */

    const descendingNumbers = Object.keys(combinations).sort((a, b) =>
        parseInt(a, 10) > parseInt(b, 10) ? -1 : 1
    );

    const largestNumber = descendingNumbers.find(d => d <= num);
    let roman = convertToRoman(num - largestNumber);
    roman = `${combinations[largestNumber].toUpperCase()}${roman}`;
    return roman;
}
