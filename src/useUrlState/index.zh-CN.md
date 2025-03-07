

# useUrlState

通过 url query 来管理 state 的 Hook。


## 使用

```js
import { useUrlState } from '@vue-widget/hooks';
```   

## 使用示例

### 基础用法

<code src="./demo/demo1.tsx" hideActions="['CSB']" />

### 多状态管理

<code src="./demo/demo2.tsx" hideActions="['CSB']" />

### 多状态管理（拆分）

<code src="./demo/demo4.tsx" hideActions="['CSB']" />

### 自定义 qs 配置

<code src="./demo/demo3.tsx" hideActions="['CSB']" />

## API

```typescript
const [state, setState] = useUrlState(initialState, options);
```

### Params

| 参数         | 说明     | 类型           | 默认值 |
| ------------ | -------- | -------------- | ------ |
| initialState | 初始状态 | `S \| () => S` | -      |
| options      | url 配置 | `Options`      | -      |

### Options

| 参数             | 说明                                                                                                    | 类型                  | 默认值   |
| ---------------- | ------------------------------------------------------------------------------------------------------- | --------------------- | -------- |
| navigateMode     | 状态变更时切换 history 的方式                                                                           | `'push' \| 'replace'` | `'push'` |
| parseOptions     | `query-string` [parse](https://github.com/ljharb/qs#parsing-object) 的配置         | `ParseOptions`        | -        |
| stringifyOptions | `query-string` [stringify](https://github.com/ljharb/stringify) 的配置 | `StringifyOptions`    | -        |

### Result

| 参数     | 说明                                    | 类型                                              |
| -------- | --------------------------------------- | ------------------------------------------------- |
| state    | url query 对象                          | `object`                                          |
| setState | 用法同 useState，但 state 需要是 object | `(state: S) => void \| (() => ((state: S) => S))` |
