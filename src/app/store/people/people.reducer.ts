import { createReducer, on } from "@ngrx/store";
import { loadBaseDataSuccess } from "../app/app.actions";
import { deleteAdminSuccess, toggleViewOnlySuccess } from "./people.actions";
import { Admin, IPeopleState } from "./people.model";

const initialPeopleState: IPeopleState = {
    students: [],
    mentors: [],
    admins: [],
}

export const PeopleReducer = createReducer(
    initialPeopleState,
    on(loadBaseDataSuccess, (state, { data }) => ({...state, students: data.students, mentors: data.mentors, admins: data.admins})),
    on(deleteAdminSuccess, (state, { uuid }) => ({...state, admins: state.admins.filter((currentAdmin) => currentAdmin.uuid != uuid)})),
    on(toggleViewOnlySuccess, (state, { uuid }) => ({...state, admins: state.admins.map<Admin>((currentAdmin) => {
        if(currentAdmin.uuid == uuid) {
            return ({...currentAdmin, isViewOnly: !currentAdmin.isViewOnly});
        } else {
            return currentAdmin;
        }
    })})),
);