'use strict';
const React = require('react');
const PropTypes = require('prop-types');
const Loadable = require('react-loadable');

const godot = require('./godot')
const Output = require('./Output')
const StatusIndicator = require('./StatusIndicator')

function asyncAsset(asset) {
  if (asset.then) {
    return asset
  } else {
    if (asset.length) {
      return import(asset)
    } else {
      return asset()
    }
  }
}

class GodotEngine extends React.PureComponent {
  render() {
    const { wasm, pak, resize, params, ...rest } = this.PropTypes

    const loader = () => asyncAsset(wasm).then(Engine =>
      this.setState({
        Engine,
        
      })
      return () => this.renderCanvas()
    )
    
    const Loader = Loadable({
      loader,
      ...rest
    })

    return 
  }

  renderCanvas() {
    return (
      <canvas id="canvas" width="640" height="480">
        HTML5 canvas appears to be unsupported in the current browser.<br />
        Please try updating or use a different browser.
      </canvas>
    )
  }

  bindCanvas(canvas) {
    godot(this.state.Engine, canvas, this.state.pakFile)
  }
}

module.exports = Loadable;
