import React, {useMemo} from 'react';
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {persistStore, persistReducer} from "redux-persist";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import storage from 'redux-persist/lib/storage';
import ReduxThunk from 'redux-thunk';
import {createStore, applyMiddleware} from "redux";
import {createTheme, CssBaseline, ThemeProvider, useMediaQuery} from "@mui/material";
import {blue, yellow} from "@mui/material/colors";
import reducers from './reducers';
import logo from './logo.svg';
import Router from "./Router";

const persistConfig = {
    key: 'root',
    stateReconciler: autoMergeLevel2,
    storage,
    blacklist: []
};

const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer, {}, applyMiddleware(ReduxThunk));
const persistor = persistStore(store);

function App() {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const theme = useMemo(
        () => createTheme({
            palette: {
                mode: prefersDarkMode ? 'dark' : 'light',
                primary: blue,
                secondary: yellow,
            },
        }),
        [prefersDarkMode]
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <Router/>
                </PersistGate>
            </Provider>
        </ThemeProvider>
    )
}

export default App;
