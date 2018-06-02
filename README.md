# react-godot
A React Component to asynchronously load the Godot Engine and bootstrap a .pak.

Uses [react-loadable](https://github.com/jamiebuilds/react-loadable) component that first loads the Godot .wasm and then ties the progress from the engine's loading of your .pak file to the loader. Supports all Loadable options.

```
<GodotEngine
  wasm={<path | Promise | () => Promise>}
  pak={<path | Promise | () => Promise>}
  resize={<boolean>}
  params={<object>}
/>
```
