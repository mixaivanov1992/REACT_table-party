import { RuleReducer } from '@store/reducer/RuleReducer';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { chapterReducer } from '@store/reducer/chapterReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { loaderReducer } from '@store/reducer/loaderReducer';
import { messageReducer } from '@store/reducer/messageReducer';
import { persistReducer, persistStore } from 'redux-persist';
import { personalDataReducer } from '@store/reducer/personalDataReducer';
import { sheetReducer } from '@store/reducer/sheetReducer';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['loaderReducer', 'messageReducer'],
};
// localStorage.clear();
export const rootReducer = combineReducers({
    personalDataReducer,
    RuleReducer,
    chapterReducer,
    sheetReducer,
    loaderReducer,
    messageReducer,
});

const persistedReducer = persistReducer<RootState, any>(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
export const persistor = persistStore(store);
