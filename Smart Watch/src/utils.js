export function zeroPadded(int) {
    return int >= 10 ? int.toString() : `0${int}`;
}