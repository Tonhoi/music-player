export const getAudio = (payload) => {
    return {
        type: 'getAudio',
        payload,
    };
};

export const setTopSong = (payload) => {
    return {
        type: 'setTopSong',
        payload,
    };
};
export const setSearchMusic = (payload) => {
    return {
        type: 'setSearchMusicc',
        payload,
    };
};
export const setGetInfoMusic = (payload) => {
    return {
        type: 'setGetInfoMusic',
        payload,
    };
};
