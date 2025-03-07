# useUrlState

A hook that store the state into url query.

## Usage

```tsx
import { useUrlState } from "@vue-widget/hooks";  
```

## Examples

### Default usage
<code src="./demo/demo1.tsx" hideActions="['CSB']" />

### Multi-state management

<code src="./demo/demo2.tsx" hideActions="['CSB']" />

### Multi-state management (split)

<code src="./demo/demo4.tsx" hideActions="['CSB']" />

### Custom qs options

<code src="./demo/demo3.tsx" hideActions="['CSB']" />

## API

```typescript
const [state, setState] = useUrlState(initialState, options);
```

### Params

| Property     | Description                    | Type           | Default |
| ------------ | ------------------------------ | -------------- | ------- |
| initialState | InitialState, same as useState | `S \| () => S` | -       |
| options      | Url config                     | `Options`      | -       |

### Options

| Property         | Description                                                                                                 | Type                  | Default  |
| ---------------- | ----------------------------------------------------------------------------------------------------------- | --------------------- | -------- |
| navigateMode     | Type of history navigate mode                                                                               | `'push' \| 'replace'` | `'push'` |
| parseOptions     | [parse](https://github.com/ljharb/qs#parsing-object) options of `qs`         | `ParseOptions`        | -        |
| stringifyOptions | [stringify](https://github.com/ljharb/stringify) options of `qs` | `StringifyOptions`    | -        |

### Result

| Property | Description                                  | Type                                              |
| -------- | -------------------------------------------- | ------------------------------------------------- |
| state    | Url query object                             | `object`                                          |
| setState | Same as useState, but state should be object | `(state: S) => void \| (() => ((state: S) => S))` |
