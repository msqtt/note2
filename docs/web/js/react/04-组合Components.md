# 组合 Components

## 创建 Boxes 组件
Boxes 组件中包含一系列 Box 组件。

## 从上往下传递数据
通过 `this.props` 属性可以从上到下传递数据。

## 传递子节点
通过 `this.props.children` 属性传递子节点

## 从下往上调用函数
注意：每个组件的 `this.state` 只能在组件内部修改，不能在其他组件内修改。

## 每个维护的数据仅能保存在一个 `this.state` 中
不要直接修改 `this.state` 的值，因为 `setState` 函数可能会将修改覆盖掉。
## 创建 `App` 组件
包含：

- 导航栏组件
- `Boxes` 组件
注意：

- 要将多个组件共用的数据存放到最近公共祖先的 `this.state` 中。

## 无状态函数组件
当组件中没有用到 `this.state` 时，可以简写为无状态的函数组件。
函数的传入参数为 `props` 对象
## 组件的生命周期
- `Mount` 周期，执行顺序：`constructor() -> render() -> componentDidMount()`
- `Update` 周期，执行顺序：`render() -> componentDidUpdate()`
- `Unmount` 周期，执行顺序：`componentWillUnmount()`

![image](https://user-images.githubusercontent.com/94043894/182876903-f6612d13-cba0-4199-a984-7863355d1362.png)
