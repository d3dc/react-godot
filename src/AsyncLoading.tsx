import * as React from "react"

import { FunctionComponent, createContext, useContext, useReducer } from "react"

export type PackLoadingState = {
  mode: string
  initializing: boolean
  percent?: number
  msg?: string
}

export type PackLoadingAction = {
  msg?: string
  initialized?: boolean
  percent?: number
  mode: string
}

export type PackLoadingDispatch = (action: PackLoadingAction) => void

const packLoadingReducer = (
  state: PackLoadingState,
  action: PackLoadingAction
) => {
  if (!state.initializing) return state

  switch (action.mode) {
    case "progress":
    case "indeterminate":
    case "notice":
    case "hidden":
      break
    default:
      throw new Error("Invalid status mode")
  }

  const nextState = {
    mode: action.mode,
    msg: action.msg,
    percent: action.percent || 0,
    initializing: !action.initialized
  }

  return nextState
}

type LoadingProps = {
  notice?: string
  percent?: number
  indeterminate: boolean
}

const LoadingContext = createContext<[PackLoadingState, PackLoadingDispatch]>([
  { mode: "", initializing: true },
  () => {}
])

export const useLoading = () => useContext(LoadingContext)

const Loading: FunctionComponent<LoadingProps> = ({
  notice,
  percent = 0,
  indeterminate = false
}) => {
  return (
    <div id="status">
      {indeterminate ? (
        <div id="status-indeterminate" onContextMenu={e => e.preventDefault()}>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      ) : (
        <div id="status-progress" onContextMenu={e => e.preventDefault()}>
          <div
            id="status-progress-inner"
            style={{ width: percent + "%" }}
          ></div>
        </div>
      )}
      {notice && (
        <div id="status-notice" className="godot">
          {notice}
        </div>
      )}
    </div>
  )
}

const AsyncLoading: FunctionComponent = ({ children }) => {
  const [loadingState, dispatchLoadingAction] = useReducer(packLoadingReducer, {
    mode: "indeterminate",
    initializing: true
  })

  return (
    <LoadingContext.Provider value={[loadingState, dispatchLoadingAction]}>
      {loadingState.mode !== "hidden" && (
        <Loading
          notice={loadingState.msg}
          percent={loadingState.percent}
          indeterminate={loadingState.mode === "indeterminate"}
        />
      )}
      {children}
    </LoadingContext.Provider>
  )
}

export default AsyncLoading
