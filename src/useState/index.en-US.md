---
nav:
  path: /hooks
---

# useSetState

used to manage the state.

## Examples

### Default usage

<code src="./demo/demo1.tsx" />

### Updating with callback

<code src="./demo/demo2.tsx" />

## API

```typescript
const [state, setState] = useState<T>(initialState);
```

### Result

| Property | Description          | Type                                                                                      | Default |
| -------- | -------------------- | ----------------------------------------------------------------------------------------- | ------- |
| state    | Current state        | `T`                                                                                       | -       |
| setState | Update current state | `(state: T \| null) => void` \| `((prevState: T) => T \| null) => void` | -       |

### Params

| Property     | Description   | Type           | Default |
| ------------ | ------------- | -------------- | ------- |
| initialState | Initial state | `T \| () => T` | -       |
