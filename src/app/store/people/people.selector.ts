import { createFeatureSelector } from "@ngrx/store";
import { IPeopleState } from "./people.model";

export const selectPeopleState = createFeatureSelector<IPeopleState>('people');