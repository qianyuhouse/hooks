---
nav:
  path: /hooks
---

# useState

管理任意类型 state 的 Hooks。

## 代码演示

### 基础用法

<code src="./demo/demo1.tsx" />

### 使用回调更新

<code src="./demo/demo2.tsx" />

## API

```typescript
const [state, setState] = useState<T>(initialState);
```

### Result

| 参数     | 说明         | 类型                                                                                      | 默认值 |
| -------- | ------------ | ----------------------------------------------------------------------------------------- | ------ |
| state    | 当前状态     | `T`                                                                                       | -      |
| setState | 设置当前状态 | `(state: T \| null) => void` \| `((prevState: T) => T \| null) => void` | -      |

### Params

| 参数         | 说明     | 类型           | 默认值 |
| ------------ | -------- | -------------- | ------ |
| initialState | 初始状态 | `T \| () => T` | -      |
