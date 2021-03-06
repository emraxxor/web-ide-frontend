export const update = (oldObject, updatedProperties) => {
    return {
        ...oldObject,
        ...updatedProperties
    };
};