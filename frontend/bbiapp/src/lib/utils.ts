// from seconds to weeks, days, hours, minutes, seconds
function numberSecToTime(sec: number) {
    const weeks = Math.floor(sec / 604800);
    const days = Math.floor((sec % 604800) / 86400);
    const hours = Math.floor(((sec % 604800) % 86400) / 3600);
    const minutes = Math.floor((((sec % 604800) % 86400) % 3600) / 60);
    const seconds = (((sec % 604800) % 86400) % 3600) % 60;

    let time = '';
    if (weeks > 0) time += weeks + 'w ';
    if (days > 0) time += days + 'd ';
    if (hours > 0) time += hours + 'h ';
    if (minutes > 0) time += minutes + 'm ';
    if (seconds > 0) time += seconds + 's';

    return time;
}

export { numberSecToTime };