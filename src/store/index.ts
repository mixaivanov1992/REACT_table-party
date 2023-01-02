import { applyMiddleware, combineReducers, createStore } from 'redux';
import { chapterReducer } from '@store/reducer/chapterReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { counterReducer } from '@store/reducer/counterReducer';
import { dialogReducer } from '@store/reducer/dialogReducer';
import { groupCounterReducer } from '@store/reducer/groupCounterReducer';
import { loaderReducer } from '@store/reducer/loaderReducer';
import { messageReducer } from '@store/reducer/messageReducer';
import { persistReducer, persistStore } from 'redux-persist';
import { personalDataReducer } from '@store/reducer/personalDataReducer';
import { ruleReducer } from '@store/reducer/ruleReducer';
import { sheetReducer } from '@store/reducer/sheetReducer';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['loaderReducer', 'messageReducer', 'ruleReducer', 'chapterReducer', 'sheetReducer', 'dialogReducer'],
};
// localStorage.clear();
export const rootReducer = combineReducers({
    personalDataReducer,
    ruleReducer,
    chapterReducer,
    sheetReducer,
    loaderReducer,
    messageReducer,
    dialogReducer,
    counterReducer,
    groupCounterReducer,
});

const persistedReducer = persistReducer<RootState, any>(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
export const store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));
export const persistor = persistStore(store);
