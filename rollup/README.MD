# 简介
本项目为rollup demo

# 项目结构

## rollup-basic

基于写的rollup基础例子
> [Rollup 打包并发布到 npm](https://blog.csdn.net/tianxintiandisheng/article/details/118369404)

## rollup-npm-package

rollup引入npm依赖包
这个 rollup-plugin-node-resolve 插件可以告诉 Rollup 如何查找外部模块

```shell
npm install --save-dev rollup-plugin-node-resolve
```
.将它加入到你的配置文件中:

```js
// rollup.config.js
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/main.js',
  output: {
    file: 'bundle.js',
    format: 'cjs'
  },
  plugins: [ resolve() ]
};
```