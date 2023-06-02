function diffDates(dt1, dt2) {
    const diffTime = dt2 - dt1;
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const remDays = diffTime % (1000 * 60 * 60);
    const hours = Math.floor(remDays / (1000 * 60 * 60 * 24));
    const remHours = remDays % (1000 * 60 * 60);
    const minutes = Math.floor(remHours / (1000 * 60));
    return { days, hours, minutes };
}

module.exports = { diffDates };
