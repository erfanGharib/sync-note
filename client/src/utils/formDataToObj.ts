export const formDataToObj = (formData: FormData) => {
    if(!formData)
        throw new Error(`invalid formData: \`${formData}\``)

    const formDataObject = {}

    formData.forEach(function(value, key) {
        formDataObject[key] = value;
    });

    return formDataObject;
}