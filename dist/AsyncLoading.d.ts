import { FunctionComponent } from "react";
export declare type PackLoadingState = {
    mode: string;
    initializing: boolean;
    percent?: number;
    msg?: string;
};
export declare type PackLoadingAction = {
    msg?: string;
    initialized?: boolean;
    percent?: number;
    mode: string;
};
export declare type PackLoadingDispatch = (action: PackLoadingAction) => void;
export declare const useLoading: () => [PackLoadingState, PackLoadingDispatch];
declare const AsyncLoading: FunctionComponent;
export default AsyncLoading;
