function numberSecToTime(sec: number) {
    const years = Math.floor(sec / 31536000);
    const months = Math.floor((sec % 31536000) / 2592000);
    const weeks = Math.floor(((sec % 31536000) % 2592000) / 604800);
    const days = Math.floor(((sec % 31536000) % 2592000) / 86400);
    const hours = Math.floor((((sec % 31536000) % 2592000) % 86400) / 3600);
    const minutes = Math.floor(((((sec % 31536000) % 2592000) % 86400) % 3600) / 60);
    const seconds = Math.floor((((((sec % 31536000) % 2592000) % 86400) % 3600) % 60));

    let time = '';
    if (years > 0) time += years + 'y ';
    if (months > 0) time += months + 'ms ';
    if (weeks > 0) time += weeks + 'w ';
    if (days > 0) time += days + 'd ';
    if (hours > 0) time += hours + 'h ';
    if (minutes > 0) time += minutes + 'm ';
    if (seconds > 0) time += seconds + 's';

    return time;
}

export { numberSecToTime };