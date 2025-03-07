---
nav:
  path: /hooks
---

# useEffect

used to listen the state changes.


## Examples

### Default usage

<code src="./demo/demo1.tsx" />  


### Use with cleanup callback  

<code src="./demo/demo2.tsx" />


## API

```typescript  
useEffect(fn, deps)
```

### Params

| Property     | Description   | Type           | Default |
| ------------ | ------------- | -------------- | ------- |
| fn | watch callback | `(newVal: T, oldVal: T) => void \| (() => void)` | -  |
| deps | watch source | `WatchSource[]` | -  |
