# react-godot
A [react-loadable](https://github.com/jamiebuilds/react-loadable) component that first loads the Godot Engine .wasm and then loads your game's .pak file.

```
<GodotEngine
  wasm={<path | Promise | () => Promise>}
  pak={<path | Promise | () => Promise>}
  resize={<boolean>}
  params={<object>}
/>
```
