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

export const initialState = {
    isPlaying: false,
    isRepeat: false,
    isRandom: false,
    isThumbnailRotate: false,
    volume: 1,
    durationSong: 0,
    nextMusic: [],
    timePlayed: [],
    currentIndex: 0,
    seekChange: 0,
    moreList: false,
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_PLAYING_MUSIC:
            return {
                ...state,
                isPlaying: action.payload,
            };
        case SET_REPEAT_MUSIC:
            return {
                ...state,
                isRepeat: action.payload,
            };
        case SET_RANDOM_MUSIC:
            return {
                ...state,
                isRandom: action.payload,
            };
        case SET_THUMBNAIL:
            return {
                ...state,
                isThumbnailRotate: action.payload,
            };
        case SET_VOLUME_MUSIC:
            return {
                ...state,
                volume: action.payload,
            };
        case SET_DURATION_MUSIC:
            return {
                ...state,
                durationSong: action.payload,
            };
        case SET_NEXT_MUSIC:
            return {
                ...state,
                nextMusic: action.payload,
            };
        case SET_TIME_PLAYED:
            return {
                ...state,
                timePlayed: action.payload,
            };
        case SET_CURRENT_INDEX:
            return {
                ...state,
                currentIndex: action.payload,
            };
        case SET_SEEK_CHANGE:
            return {
                ...state,
                seekChange: action.payload,
            };
        case SET_MORE_LIST:
            return {
                ...state,
                moreList: action.payload,
            };

        default:
            throw new Error('Có lỗi xả ra');
    }
};

export default reducer;
