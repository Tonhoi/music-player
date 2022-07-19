import {
    SET_CURRENT_INDEX,
    SET_DURATION_MUSIC,
    SET_NEXT_MUSIC,
    SET_PLAYING_MUSIC,
    SET_RANDOM_MUSIC,
    SET_REPEAT_MUSIC,
    SET_THUMBNAIL,
    SET_TIME_PLAYED,
    SET_VOLUME_MUSIC,
    SET_SEEK_CHANGE,
    SET_MORE_LIST,
} from './constants';

export const setPlayingMusic = (payload) => {
    return {
        type: SET_PLAYING_MUSIC,
        payload,
    };
};

export const setRepeatMusic = (payload) => {
    return {
        type: SET_REPEAT_MUSIC,
        payload,
    };
};

export const setRandomMusic = (payload) => {
    return {
        type: SET_RANDOM_MUSIC,
        payload,
    };
};

export const setThumnail = (payload) => {
    return {
        type: SET_THUMBNAIL,
        payload,
    };
};

export const setVolumeMusic = (payload) => {
    return {
        type: SET_VOLUME_MUSIC,
        payload,
    };
};

export const setDurationMusic = (payload) => {
    return {
        type: SET_DURATION_MUSIC,
        payload,
    };
};

export const setNextMusic = (payload) => {
    return {
        type: SET_NEXT_MUSIC,
        payload,
    };
};

export const setTimePlayed = (payload) => {
    return {
        type: SET_TIME_PLAYED,
        payload,
    };
};
export const setCurrentIndex = (payload) => {
    return {
        type: SET_CURRENT_INDEX,
        payload,
    };
};

export const setSeekChange = (payload) => {
    return {
        type: SET_SEEK_CHANGE,
        payload,
    };
};
export const setMoreList = (payload) => {
    return {
        type: SET_MORE_LIST,
        payload,
    };
};
