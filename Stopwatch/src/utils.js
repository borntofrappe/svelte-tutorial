// utility functions used in the project

function zeroPadded(number) {
    return number >= 10 ? number.toString() : `0${number}`;
}
// for the tenths of seconds consider the last digit of the number of tenths of seconds
function lastDigit(number) {
    return number.toString()[number.toString().length - 1];
}

/* format time
input: number of milliseconds

output: time in the following format
mm:ss:t
zero padded minutes, zero padded seconds, tenths of seconds
*/
export function formatTime(milliseconds) {
    const mm = zeroPadded(Math.floor(milliseconds / 36000));
    const ss = zeroPadded(Math.floor(milliseconds / 1000) % 60);
    const t = lastDigit(Math.floor(milliseconds / 100));
    return `${mm}:${ss}.${t}`;
}