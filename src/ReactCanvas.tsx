import * as React from "react"

import { FunctionComponent, useEffect, useRef, useState } from "react"

import { useLoading } from "./AsyncLoading"

export type ReactEngineProps = {
  engine: Engine
  pck: string
  width?: number
  height?: number
  params?: any
  resize?: boolean
}

function toFailure(err) {
  var msg = err.message || err
  console.error(msg)
  return { msg, mode: "notice", initialized: true }
}

const ReactCanvas: FunctionComponent<ReactEngineProps> = ({
  engine,
  pck,
  width = 480,
  height = 300
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [instance, setInstance] = useState()
  const [loadingState, changeLoadingState] = useLoading()

  useEffect(() => {
    if (engine.isWebGLAvailable()) {
      changeLoadingState({ mode: "indeterminate" })
      setInstance(new engine())
    } else {
      changeLoadingState(toFailure("WebGL not available"))
    }
  }, [engine])

  useEffect(() => {
    if (instance) {
      instance
        .startGame(pck)
        .then(() => {
          changeLoadingState({ mode: "hidden", initialized: true })
        })
        .catch(err => changeLoadingState(toFailure(err)))

      instance.setProgressFunc((current, total) => {
        if (total > 0) {
          changeLoadingState({ mode: "progress", percent: current / total })
        } else {
          changeLoadingState({ mode: "indeterminate" })
        }
      })
    }
  }, [instance, pck, changeLoadingState])

  useEffect(() => {
    if (instance) {
      instance.setCanvas(canvasRef.current)
    }
  }, [instance, canvasRef.current])

  return (
    <canvas
      ref={canvasRef}
      id="canvas"
      width={width}
      height={height}
      style={{ display: loadingState.initializing ? "hidden" : "block" }}
    >
      HTML5 canvas appears to be unsupported in the current browser.
      <br />
      Please try updating or use a different browser.
    </canvas>
  )
}

export default ReactCanvas
