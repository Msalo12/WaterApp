/**
 * Formats a given timestamp into a string in the format: YYYY-MM-DDTHH:mm:ss
 * @param {Date} time - The timestamp to format.
 * @returns {string} - The formatted timestamp in the format: YYYY-MM-DDTHH:mm:ss.
 */

export const formatTimestamp = (time) => {
    // Get the year, month, day, hours, minutes, and seconds from the provided timestamp
    const year = time.getUTCFullYear();
    const month = String(time.getUTCMonth() + 1).padStart(2, '0');
    const day = String(time.getUTCDate()).padStart(2, '0');
    const hours = String(time.getUTCHours()).padStart(2, '0');
    const minutes = String(time.getUTCMinutes()).padStart(2, '0');
    const seconds = String(time.getUTCSeconds()).padStart(2, '0');

    // Return the formatted timestamp as a string in the format: YYYY-MM-DDTHH:mm:ss
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};