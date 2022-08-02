import {
    LoaderAction, LoaderActionType, LoaderState, ShowLoader,
} from '@models/store/reducer/loaderReducer';

const initialState: LoaderState = {
    isLoading: false,
};

export const loaderReducer = (state = initialState, action: LoaderAction): LoaderState => {
    switch (action.type) {
    case LoaderActionType.SHOW_LOADER:
        return { isLoading: action.isLoading };
    default:
        return state;
    }
};

export const showLoader = (isLoading:boolean): ShowLoader => ({
    type: LoaderActionType.SHOW_LOADER,
    isLoading,
});
