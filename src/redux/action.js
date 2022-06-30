export const handleDebounce = (payload) => {
    return {
        type: 'getValueDebounce',
        payload: payload,
    };
};
