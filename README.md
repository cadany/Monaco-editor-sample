# Monaco-editor sample

Monaco-editor react示例，支持多页签切换，语言打包使用monaco-editor-webpack-plugin。基于React-app和antd，创建 [Create React App](https://github.com/facebook/create-react-app).

## 创建
创建步骤
```text
yarn create react-app monaco-editor-sample --template typescript
```


## 引入组件
添加`antd`
```text
yarn add antd
yarn add react-app-rewired --dev
yarn add customize-cra --dev

```
添加`monaco-editor`
```text
yarn add monaco-editor
yarn add monaco-editor-webpack-plugin
```

## 主要配置

引入MonacoWebpackPlugin，打包时根据languages选择性打开。如果插件参数为空时`languages:[]`则默认打所有语言包。

```typescript 
// config-overrides.js
const {
    fixBabelImports
} = require("customize-cra");
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = function override(config, env) {
    fixBabelImports("babel-plugin-import", {
        libraryName: "antd",
        style: "css",
    }, config);

    config.plugins.push(new MonacoWebpackPlugin({languages:["sql", "mysql","redis"]}));

    return config;
}
```

## 启动

```text
yarn start
```

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
