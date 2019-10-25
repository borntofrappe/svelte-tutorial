// utility function returning a 2-characters long string out of the input integer
export function zeroPadded(int) {
    return int >= 10 ? int.toString() : `0${int}`;
}

// utility function returning a 9-characters long string with empty characters prefacing the input value
export function ninePadded(string) {
    return string.padStart(9, " ");
}