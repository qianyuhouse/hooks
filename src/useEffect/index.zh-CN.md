---
nav:
  path: /hooks
---

# 

监听任意 state 变化的 Hooks。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />


### 使用回调移除副作用

<code src="./demo/demo2.tsx" />

### 与 useLayoutEffect 的区别

<code src="./demo/demo3/index.tsx" />

## API

```typescript  
useEffect(fn, deps)
```

### Params

| Property     | Description   | Type           | Default |
| ------------ | ------------- | -------------- | ------- |
| fn | 状态改变回调函数 | `(newVal: T, oldVal: T) => void \| (() => void)` | -  |
| deps | 监听状态 | `WatchSource[]` | -  |
