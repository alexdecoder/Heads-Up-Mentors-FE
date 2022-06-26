import { createAction, props } from "@ngrx/store";

export const login = createAction(
    '[Auth] Login',
    props<{email: string, password: string}>()
);

export const indicateLoading = createAction(
    '[UI] Display Loading Indicator',
);

export const loginFailure = createAction(
    '[Auth] Login Failed',
    props<{data: any}>(),
);

export const loginSuccess = createAction(
    '[Auth] Login Success',
    props<{data: any}>(),
);

export const loginError = createAction(
    '[App] Error',
    props<{data: any}>(),
);

export const forceJwt = createAction(
    '[Auth] JWT Token Forced',
    props<{jwt: string}>(),
);

export const loadBaseData = createAction(
    '[App] Load Base Data',  
);

export const invalidAuth = createAction(
    '[Auth] Invalid Auth',
);

export const loadBaseDataSuccess = createAction(
    '[App] Load Base Data Success',
    props<{data: any}>(),
);

export const destroyAuthCookie = createAction(
    '[Auth] Destroy Auth Cookie',
);