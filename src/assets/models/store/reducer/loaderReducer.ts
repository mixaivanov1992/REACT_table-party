export interface LoaderState {
    isLoading: boolean
}
export enum LoaderActionType {
    SHOW_LOADER = 'SHOW_LOADER',
}

export interface ShowLoader {
    type: LoaderActionType.SHOW_LOADER,
    isLoading: boolean
}

export type LoaderAction = ShowLoader;
