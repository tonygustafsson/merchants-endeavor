export const ucFirst = string => {
    if (!string || string === '') return '';
    return string.charAt(0).toUpperCase() + string.slice(1);
};
