/**
 * @function ReactGodot
 */

import './styles.css'

import * as React from 'react'

import { FunctionComponent, useEffect, useRef, useState } from 'react'

import AsyncLoading from './AsyncLoading'
import ReactCanvas from './ReactCanvas'

import type { Engine, EngineLoaderDescription } from './typings'

const useScript = (url: string, onLoad: () => void) => {
  useEffect(() => {
    const script = document.createElement('script')

    script.src = url
    script.async = true
    script.onload = onLoad

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [url])
}

export interface ReactGodotProps {
  script: EngineLoaderDescription
  pck: string
  wasm?: string
  resize?: boolean
  width?: number
  height?: number
  params?: any
}

const ReactGodot: FunctionComponent<ReactGodotProps> = (props) => {
  const { script, pck, wasm, resize = false, width, height, params } = props
  const outerRef = useRef<HTMLDivElement>(null)
  const [engine, setEngine] = useState<Engine>(null)
  const [dimensions, setDimensions] = useState([width, height])

  useScript(script, () => {
    const scope = window as any
    setEngine(() => scope.Engine)
  })

  useEffect(() => {
    if (resize && (outerRef.current != null)) {
      setDimensions([
        outerRef.current.clientWidth,
        outerRef.current.clientHeight
      ])
    }
  }, [resize, outerRef.current])

  return (
    <div id='wrap' ref={outerRef}>
      <AsyncLoading>
        {engine && (
          <ReactCanvas
            pck={pck}
            engine={engine}
            wasm={wasm}
            width={dimensions[0]}
            height={dimensions[1]}
            params={params}
          />
        )}
      </AsyncLoading>
    </div>
  )
}

export default ReactGodot
