import "react-godot/dist/styles.css"

import React from "react"
import ReactGodot from "react-godot"

const examplePck = "/flappy/flappy.pck"
const exampleEngine = "/flappy/flappy.js"

function App() {
  return <ReactGodot pck={examplePck} script={exampleEngine} />
}

export default App
