export const isJson = (str: string) => {
    try {
        return JSON.parse(str);
    } catch (e) {
        return false;
    }
};