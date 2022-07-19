import { setSearchMusic } from './action';

const initialState = {
    audio: '',
    getInfoMusic: [],
    topSong: [],
    searchMusic: [],
    nextMusic: [],
};
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'getAudio':
            return {
                ...state,
                audio: action.payload,
            };

        case 'setTopSong':
            return {
                ...state,
                topSong: [...state.topSong, action.payload],
            };
        case 'setSearchMusicc':
            const result = [...state.searchMusic];
            if (result.length > 9) {
                result.splice(0, 10);
            }
            return {
                ...state,
                searchMusic: [...result, action.payload],
            };
        case 'setGetInfoMusic':
            return {
                ...state,
                getInfoMusic: action.payload,
            };

        default:
            return state;
    }
};

export default rootReducer;

export function setGetInfoMusics(todo) {
    return function setGetInfoMusicsThunk(dispatch, getState) {
        // const text = Object.assign({}, getState());
        // if (text.searchMusic.length > 0) {
        //     text.getInfoMusic = [];
        // }
        dispatch(setSearchMusic(todo));
    };
}
