export interface IAppState {
    isLoading: boolean,
    jwt?: string | null,
    isViewOnly?: boolean | null,
    destroyAuthCookie?: boolean | null,
    hasLoaded: boolean,
    authFailed?: boolean | null,
}