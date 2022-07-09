const initialState = {
    audio: '',
    data: [],
    getInfoMusic: [],
};
const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'getAudio':
            return {
                ...state,
                audio: action.payload,
            };

        case 'setData':
            return {
                ...state,
                data: [...state.data, action.payload],
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
