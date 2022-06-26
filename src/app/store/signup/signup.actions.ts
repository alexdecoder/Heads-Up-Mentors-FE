import { createAction, props } from "@ngrx/store";

export const confirmCodeValidity = createAction(
    '[Signup] Confirm Code Validity',
    props<{code: string}>(),
);

export const codeValidityConfirmed = createAction(
    '[Signup] Code Validity Verified',
);

export const codeInvalid = createAction(
    '[Signup] Code Invalid',
);

export const signupConflict = createAction(
    '[Signup] Signup Conflict',
);

export const confirmSignup = createAction(
    '[Signup] Confirm Signup',
    props<{code: string, name: string, email: string, password: string}>(),
);

export const signupSuccess = createAction(
    '[Signup] Signup Success',
    props<{jwt: string}>(),
);