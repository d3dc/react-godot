import * as React from "react";
import { useEffect, useRef, useState, useCallback, } from "react";
import { useLoading } from "./AsyncLoading";
function toFailure(err) {
    var msg = err.message || err;
    console.error(msg);
    return { msg: msg, mode: "notice", initialized: true };
}
var ReactCanvas = function (_a) {
    var engine = _a.engine, pck = _a.pck, wasm = _a.wasm, _b = _a.width, width = _b === void 0 ? 480 : _b, _c = _a.height, height = _c === void 0 ? 300 : _c;
    var canvasRef = useRef(null);
    var _d = useState(null), instance = _d[0], setInstance = _d[1];
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
    var progressFunc = useCallback(function (current, total) {
        if (total > 0) {
            changeLoadingState({ mode: "progress", percent: current / total });
        }
        else {
            changeLoadingState({ mode: "indeterminate" });
        }
    }, []);
    useEffect(function () {
        if (instance != null) {
            var olderGodot = typeof instance.setProgressFunc === "function";
            console.log("starting", canvasRef.current, instance);
            if (!olderGodot && wasm == null) {
                changeLoadingState(toFailure("You must pass in the wasm prop for newer versions of Godot!"));
                return;
            }
            instance
                .startGame(olderGodot
                ? pck
                : {
                    executable: wasm === null || wasm === void 0 ? void 0 : wasm.replace(/\.wasm$/i, ""),
                    canvas: canvasRef.current,
                    mainPack: pck,
                    canvasResizePolicy: 0,
                    onProgress: progressFunc,
                })
                .then(function () {
                changeLoadingState({ mode: "hidden", initialized: true });
            })
                .catch(function (err) { return changeLoadingState(toFailure(err)); });
            // older versions of Godot have this callback register
            if (olderGodot) {
                instance.setProgressFunc(progressFunc);
            }
        }
    }, [instance, pck, wasm, changeLoadingState]);
    useEffect(function () {
        // older versions of Godot use this method to set the canvas
        if (instance && typeof instance.setCanvas === "function") {
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