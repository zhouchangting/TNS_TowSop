
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry:'./src/index.js',
    output:{
        path: path.join(__dirname, 'dist'),
        //每次生成不一样的hash值作为名称，防止缓存
        filename: "[name].[hash:5].bundle.js"
    },

    devServer: {
        // contentBase: path.join(__dirname, 'public/index.html'),
        contentBase: path.join(__dirname, './src'),
        host: '0.0.0.0',
        //使用热加载(自动刷新页面)
        hot: true,
        //关闭自动打开网页功能
        open: false,
        port: 12345,
        compress: true
    },
    module: {
        rules: [
            {
                //配置JSX编译
                test: /\.jsx?$/,
                exclude: path.join(__dirname, 'node_modules'),
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-react'],
                        plugins: [
                            ['@babel/plugin-proposal-decorators', { legacy: true }],
                            ['@babel/plugin-proposal-class-properties', { loose: true }],
                            '@babel/plugin-syntax-dynamic-import',
                            [
                                'import',{
                                    "libraryName": "antd",
                                    "style": "css"
                            }]
                        ]
                    }
                }]
            },
            //配置css
            {
                test:/\.css$/,
                // exclude: path.join(__dirname, 'node_modules'),
                use: ['style-loader', 'css-loader']
            },
            //配置sass
            {
                test:/\.scss$/,
                exclude: path.join(__dirname, 'node_modules'),
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            //配置文件
            {
                test:/\.png|jpg|gif$/,
                use:['file-loader']
            }
        ]
    },
    plugins: [
        //清除dist下的*.js且每次构建时重新生成一个*.bundle.js，防止缓存
        new CleanWebpackPlugin(),
        //webpack-dev-server显示文件路径，让public/index.html下生成*.bundle.js
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public/index.html')
        })
    ],

    resolve: {
        extensions: [".js", ".jsx", ".json", ".jpg", ".png"],
        alias: {
            "@": path.join(__dirname,"src"),
            "#": path.join(__dirname,"public")
        }
    }
}