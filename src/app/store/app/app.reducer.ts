import { createReducer, on } from "@ngrx/store";
import { deleteAdmin, deleteAdminSuccess, toggleViewOnly, toggleViewOnlySuccess } from "../people/people.actions";
import { codeInvalid, codeValidityConfirmed, confirmCodeValidity, confirmSignup, signupConflict, signupSuccess } from "../signup/signup.actions";
import { forceJwt, indicateLoading, invalidAuth, loadBaseData, loadBaseDataSuccess, login, loginError, loginFailure, loginSuccess } from "./app.actions";
import { IAppState } from "./app.model";

const initialAppState: IAppState = {
    isLoading: false,
    hasLoaded: false,
};

export const AppReducer = createReducer(
    initialAppState,
    on(indicateLoading, (state) => ({...state, isLoading: true})),
    on(loginSuccess, (state, { data }) => ({...state, isLoading: false, jwt: data.access_token, isViewOnly: data.isViewOnly, authFailed: null})),
    on(loginFailure, (state) => ({...state, isLoading: false, authFailed: true})),
    on(login, (state) => ({...state, authFailed: null})),
    on(loginError, (state) => ({...state, isLoading: false, authFailed: null})),
    on(forceJwt, (state, { jwt }) => ({...state, jwt: jwt})),
    on(loadBaseData, (state) => ({...state, isLoading: true})),
    on(loadBaseDataSuccess, (state, { data }) => ({...state, isLoading: false, hasLoaded: true, isViewOnly: data.user.isViewOnly})),
    on(invalidAuth, (_) => ({...initialAppState, destroyAuthCookie: true})),
    on(toggleViewOnly, (state) => ({...state, isLoading: true})),
    on(toggleViewOnlySuccess, (state) => ({...state, isLoading: false})),
    on(deleteAdmin, (state) => ({...state, isLoading: true})),
    on(deleteAdminSuccess, (state) => ({...state, isLoading: false})),
    on(confirmCodeValidity, (state) => ({...state, isLoading: true})),
    on(codeValidityConfirmed, (state) => ({...state, isLoading: false})),
    on(codeInvalid, (state) => ({...state, isLoading: false})),
    on(signupConflict, (state) => ({...state, isLoading: false})),
    on(signupSuccess, (state, { jwt }) => ({...state, jwt: jwt, isLoading: false})),
    on(confirmSignup, (state) => ({...state, isLoading: true})),
);