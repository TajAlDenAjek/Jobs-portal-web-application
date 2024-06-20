export const validateDate = (rule: any, value: any, callback: any) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (value && !dateRegex.test(value)) {
        callback('Please enter a valid date in the format YYYY-MM-DD');
    } else {
        callback();
    }
};

export const checkDate = (value: any) => {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(value)) {
        return false
    }
    return true;

};
