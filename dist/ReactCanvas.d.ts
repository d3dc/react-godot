import { FunctionComponent } from "react";
export declare type ReactEngineProps = {
    engine: Engine;
    pck: string;
    width?: number;
    height?: number;
    params?: any;
    resize?: boolean;
};
declare const ReactCanvas: FunctionComponent<ReactEngineProps>;
export default ReactCanvas;
