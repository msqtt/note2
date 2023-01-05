# Redux


redux 将所有数据存储到树中，且树是唯一的。

## Redux 基本概念
- store：存储树结构。
- state：维护的数据，一般维护成树的结构。
- reducer：对 state 进行更新的函数，每个 state 绑定一个 reducer。传入两个参数：当前 state 和 action，返回新 state。
- action：一个普通对象，存储 reducer 的传入参数，一般描述对 state 的更新类型。
- dispatch：传入一个参数 action，对整棵 state 树操作一遍。
## React-Redux 基本概念
- Provider 组件：用来包裹整个项目，其 store 属性用来存储 redux 的 store 对象。
- connect(mapStateToProps, mapDispatchToProps)函数：用来将 store 与组件关联起来。
    - mapStateToProps：每次 store 中的状态更新后调用一次，用来更新组件中的值。
    - mapDispatchToProps：组件创建时调用一次，用来将 store 的 dispatch 函数传入组件。
## 安装
- npm i redux react-redux @reduxjs/toolkit

