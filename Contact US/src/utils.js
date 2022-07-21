// regex checking for a valid US phone number
// following the freeCodeCamp guidelines https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/javascript-algorithms-and-data-structures-projects/telephone-number-validator
export const telephoneCheck = (str) => /^1? ?(\d{3}|\(\d{3}\))[- ]?\d{3}[- ]?\d{4}$/.test(str)