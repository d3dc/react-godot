# react-godot

> Load a webassembly build of the Godot engine and Bootstrap packed games from within the react component tree

[![NPM](https://img.shields.io/npm/v/react-godot.svg)](https://www.npmjs.com/package/react-godot) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-godot
```

## Usage

```tsx
import * as React from "react";

import ReactGodot from "react-godot";

class Example extends React.Component {
  render() {
    return (
      <ReactGodot
        script="/path/to/myGame.js"
        pck="/path/to/myGame.pck"
        wasm="/path/to/myGame.wasm"
      />
    );
  }
}
```

Tested with HTML5 export from Godot 3.5.3 LTS.

## License

MIT © [d3dc](https://github.com/d3dc)
