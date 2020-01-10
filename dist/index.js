/**
 * @function ReactGodot
 */
import "./styles.css";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import AsyncLoading from "./AsyncLoading";
import ReactCanvas from "./ReactCanvas";
var useScript = function (url, onLoad) {
    useEffect(function () {
        var script = document.createElement("script");
        script.src = url;
        script.async = true;
        script.onload = onLoad;
        document.body.appendChild(script);
        return function () {
            document.body.removeChild(script);
        };
    }, [url]);
};
var ReactGodot = function (props) {
    var script = props.script, pck = props.pck, _a = props.resize, resize = _a === void 0 ? false : _a, width = props.width, height = props.height, params = props.params;
    var outerRef = useRef(null);
    var _b = useState(null), engine = _b[0], setEngine = _b[1];
    var _c = useState([width, height]), dimensions = _c[0], setDimensions = _c[1];
    useScript(script, function () {
        var scope = window;
        setEngine(function () { return scope.Engine; });
    });
    useEffect(function () {
        if (resize && outerRef.current) {
            setDimensions([
                outerRef.current.clientWidth,
                outerRef.current.clientHeight
            ]);
        }
    }, [resize, outerRef.current]);
    return (React.createElement("div", { id: "wrap", ref: outerRef },
        React.createElement(AsyncLoading, null, engine && (React.createElement(ReactCanvas, { pck: pck, engine: engine, width: dimensions[0], height: dimensions[1], params: params })))));
};
export default ReactGodot;
//# sourceMappingURL=index.js.map