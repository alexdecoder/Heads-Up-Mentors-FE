import { createReducer, on } from "@ngrx/store";
import { codeInvalid, codeValidityConfirmed, signupConflict, signupSuccess } from "./signup.actions";
import { ISignupState } from "./signup.model";

const initialSignupState: ISignupState = {} 

export const SignupReducer = createReducer(
    initialSignupState,
    on(codeValidityConfirmed, (state) => ({...state, codeValidityConfirmed: true})),
    on(codeInvalid, (state) => ({...state, codeValidityConfirmed: false})),
    on(signupConflict, (state) => ({...state, userDidConflict: true})),
    on(signupSuccess, (_) => initialSignupState),
)