import { createFeatureSelector } from "@ngrx/store";
import { IAppState } from "./app.model";

export const selectAppState = createFeatureSelector<IAppState>('app');