/* logic used to format the date instance */
const format = new Intl.DateTimeFormat("en-US-u-ca-gregory", {
    year: "numeric",
    month: "short",
    day: "numeric"
});

export function formatDate(date) {
    return format.format(date);
}

export function formatMilliseconds(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    let lapse;
    if (hours > 0) {
        lapse = `${hours}h`;
    } else if (minutes > 0) {
        lapse = `${minutes}m`;
    } else if (seconds > 0) {
        lapse = `${seconds}s`;
    } else {
        lapse = "Now";
    }
    return lapse;

}