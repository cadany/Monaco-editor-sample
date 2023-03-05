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
