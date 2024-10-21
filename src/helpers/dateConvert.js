
// This function takes a date string and converts it to a local time string
export const dateConvert = (createdAt) => {
    const date = new Date(createdAt);

    const localTime = date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, 
    });

    return localTime;
}