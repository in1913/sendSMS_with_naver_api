const ConvertDate = (date) => {
    const newDate = new Date(date);
    return newDate.getUTCFullYear() + '-' + (newDate.getUTCMonth() + 1) + '-' + newDate.getUTCDate();
};

export default ConvertDate;