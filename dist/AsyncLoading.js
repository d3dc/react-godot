import * as React from "react";
import { createContext, useContext, useReducer } from "react";
var packLoadingReducer = function (state, action) {
    if (!state.initializing)
        return state;
    switch (action.mode) {
        case "progress":
        case "indeterminate":
        case "notice":
        case "hidden":
            break;
        default:
            throw new Error("Invalid status mode");
    }
    var nextState = {
        mode: action.mode,
        msg: action.msg,
        percent: action.percent || 0,
        initializing: !action.initialized
    };
    return nextState;
};
var LoadingContext = createContext([
    { mode: "", initializing: true },
    function () { }
]);
export var useLoading = function () { return useContext(LoadingContext); };
var Loading = function (_a) {
    var notice = _a.notice, _b = _a.percent, percent = _b === void 0 ? 0 : _b, _c = _a.indeterminate, indeterminate = _c === void 0 ? false : _c;
    return (React.createElement("div", { id: "status" },
        indeterminate ? (React.createElement("div", { id: "status-indeterminate", onContextMenu: function (e) { return e.preventDefault(); } },
            React.createElement("div", null),
            React.createElement("div", null),
            React.createElement("div", null),
            React.createElement("div", null),
            React.createElement("div", null),
            React.createElement("div", null),
            React.createElement("div", null),
            React.createElement("div", null))) : (React.createElement("div", { id: "status-progress", onContextMenu: function (e) { return e.preventDefault(); } },
            React.createElement("div", { id: "status-progress-inner", style: { width: percent + "%" } }))),
        notice && (React.createElement("div", { id: "status-notice", className: "godot" }, notice))));
};
var AsyncLoading = function (_a) {
    var children = _a.children;
    var _b = useReducer(packLoadingReducer, {
        mode: "indeterminate",
        initializing: true
    }), loadingState = _b[0], dispatchLoadingAction = _b[1];
    return (React.createElement(LoadingContext.Provider, { value: [loadingState, dispatchLoadingAction] },
        loadingState.mode !== "hidden" && (React.createElement(Loading, { notice: loadingState.msg, percent: loadingState.percent, indeterminate: loadingState.mode === "indeterminate" })),
        children));
};
export default AsyncLoading;
//# sourceMappingURL=AsyncLoading.js.map