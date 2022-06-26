import { createAction, props } from "@ngrx/store";

export const toggleViewOnly = createAction(
    '[Admin] Toggle View Only',
    props<{uuid: string}>(),
);

export const toggleViewOnlySuccess = createAction(
    '[Admin] Toggle View Only Success',
    props<{uuid: string}>(),
);

export const deleteAdmin = createAction(
    '[Admin] Delete Admin',
    props<{uuid: string}>(),
)

export const deleteAdminSuccess = createAction(
    '[Admin] Delete Admin Success',
    props<{uuid: string}>(),
);