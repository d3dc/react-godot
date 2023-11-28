import { FunctionComponent } from "react";
import type { Engine } from "./typings";
export declare type ReactEngineProps = {
    engine: Engine;
    pck: string;
    wasm?: string;
    width?: number;
    height?: number;
    params?: any;
    resize?: boolean;
};
declare const ReactCanvas: FunctionComponent<ReactEngineProps>;
export default ReactCanvas;
