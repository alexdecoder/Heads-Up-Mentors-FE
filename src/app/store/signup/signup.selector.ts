import { createFeatureSelector } from "@ngrx/store";
import { ISignupState } from "./signup.model";

export const selectSignupState = createFeatureSelector<ISignupState>('signup');