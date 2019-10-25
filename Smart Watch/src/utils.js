// utility function returning a 2-characters long string out of the input integer
export function zeroPadded(int) {
    return int >= 10 ? int.toString() : `0${int}`;
}