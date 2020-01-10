import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { useLoading } from "./AsyncLoading";
function toFailure(err) {
    var msg = err.message || err;
    console.error(msg);
    return { msg: msg, mode: "notice", initialized: true };
}
var ReactCanvas = function (_a) {
    var engine = _a.engine, pck = _a.pck, _b = _a.width, width = _b === void 0 ? 480 : _b, _c = _a.height, height = _c === void 0 ? 300 : _c;
    var canvasRef = useRef(null);
    var _d = useState(), instance = _d[0], setInstance = _d[1];
    var _e = useLoading(), loadingState = _e[0], changeLoadingState = _e[1];
    useEffect(function () {
        if (engine.isWebGLAvailable()) {
            changeLoadingState({ mode: "indeterminate" });
            setInstance(new engine());
        }
        else {
            changeLoadingState(toFailure("WebGL not available"));
        }
    }, [engine]);
    useEffect(function () {
        if (instance) {
            instance
                .startGame(pck)
                .then(function () {
                changeLoadingState({ mode: "hidden", initialized: true });
            })
                .catch(function (err) { return changeLoadingState(toFailure(err)); });
            instance.setProgressFunc(function (current, total) {
                if (total > 0) {
                    changeLoadingState({ mode: "progress", percent: current / total });
                }
                else {
                    changeLoadingState({ mode: "indeterminate" });
                }
            });
        }
    }, [instance, pck, changeLoadingState]);
    useEffect(function () {
        if (instance) {
            instance.setCanvas(canvasRef.current);
        }
    }, [instance, canvasRef.current]);
    return (React.createElement("canvas", { ref: canvasRef, id: "canvas", width: width, height: height, style: { display: loadingState.initializing ? "hidden" : "block" } },
        "HTML5 canvas appears to be unsupported in the current browser.",
        React.createElement("br", null),
        "Please try updating or use a different browser."));
};
export default ReactCanvas;
//# sourceMappingURL=ReactCanvas.js.map