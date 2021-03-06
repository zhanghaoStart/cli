const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Webpack = require('webpack');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const {merge} = require('webpack-merge');

module.exports = (cwd, singleItemPath, params) => {
    const baseConf = require('./webpack.config.base')(cwd, singleItemPath, params);
    const scripts = fs.readdirSync(path.join(cwd, './dist', './scripts'));
    let name;
    scripts.forEach(v => {
        if(v.includes('dll')) {
            name = v;
        }
    })
    const devConf = {
        // 将loader依赖和plugin依赖 抽到脚手架中
        // context: path.join(__dirname, '../../'),
        mode: 'development',
        output: {
            pathinfo: true
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(singleItemPath, `index.html`),
                filename: `${params}.html`,
            })
        ],
        devtool: 'inline-source-map',
    };

    return merge(baseConf, devConf);
};
