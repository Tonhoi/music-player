import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
// import { composeWithDevTools } from 'redux-devtools-extension';

// const composedEnhancers = composeWithDevTools();

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
