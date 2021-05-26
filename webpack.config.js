/*
 * @Author: Yzed 
 * @Date: 2019-02-17 14:38:40 
 * @Last Modified by: Yzed
 * @Last Modified time: 2021-05-25 15:25:44
 */

const path = require('path')
const ExtractTextPlugin   = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

//环境变量配置
let WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev'
//获取html-webpack-plugin参数的方法
const getHtmlConfig = function(name,title){
    return {
        template: `./src/view/${name}.html`,
        filename: `view/${name}.html`,
        favicon: './favicon.ico',
        title: title,
        inject: true,
        hash: true,
        chunks: ['common',name]
    }
}

//webpack配置
const config = {
    mode : 'dev' === WEBPACK_ENV ? 'development' : 'production',
    entry: {
        'common'            : './src/page/common/common',
        'index'             : './src/page/index/index',
        'user-login'        : './src/page/user-login/user-login',
        'user-register'     : './src/page/user-register/user-register',
        'user-pass-reset'   : './src/page/user-pass-reset/user-pass-reset',
        'user-center'       : './src/page/user-center/user-center',
        'user-article'      : './src/page/user-article/user-article',
        'user-collection'   : './src/page/user-collection/user-collection',
        'user-follows'      : './src/page/user-follows/user-follows',
        'user-fans'         : './src/page/user-fans/user-fans',
        'list'              : './src/page/list/list',
        'article-write'     : './src/page/article-write/article-write',
        'article-update'    : './src/page/article-update/article-update',
        'article-detail'    : './src/page/article-detail/article-detail',
        'uni-article-detail': './src/page/uni-article-detail/uni-article-detail'
    },
    output: {
        publicPath  : 'dev' === WEBPACK_ENV ? '/dist/' : '/dist/',
        filename: 'js/[name].bundle.js',
        chunkFilename: 'js/[name].chunk.js'
    },
    devtool: 'source-map',
    devServer: {
        port: 8088,
        overlay: true,
        inline: true,
        //解决跨域问题
        proxy : {
            '**/*.do' : {
                // target: 'http://test.happymmall.com',
                // target: 'https://www.easy-mock.com/mock/5cd3bbd3b9080f6a69b39f25/api',
                // target: 'http://192.168.43.181:8080',
                // target: 'http://192.168.43.183:8080',
                // target: 'http://172.20.10.5:8080',
                // target: 'https://blogs.wcytk.com',
                target: 'http://localhost:8079',
                // target: 'http://wb.hyzed.cn:8080',
                changeOrigin : true
            }
        }
    },
    externals: {
        'jquery': 'window.jQuery'
    },
    resolve: {
        alias: {
            node_modules    : __dirname + '/node_modules',
            util: __dirname + '/src/util',
            page: __dirname + '/src/page',
            service: __dirname + '/src/service',
            image: __dirname + '/src/image'
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/, // 针对js结尾的文件设置LOADER
                use: {
                    loader: 'babel-loader'
                },
                include: [path.resolve(__dirname,'./src')],
                exclude: '/node_modules/'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            // 模板文件的处理
            {
                test: /\.string$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        minimize : true,
                        removeAttributeQuotes : false
                    }
                }
            },
            // 图片的配置
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 2048,
                            name: 'resource/[name].[ext]'
                        }
                    }
                ]
            },
            // 字体图标的配置
            {
                test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: 'resource/[name].[ext]'
                        }
                    }
                ]
            }
        ]
    },
    optimization: {
        runtimeChunk: false,
        splitChunks: {
            cacheGroups: {
                common: {
                    name: "common",
                    chunks: "all",
                    minChunks: 2
                }
            }
        }
    },
    plugins: [
        //清理dist
        new CleanWebpackPlugin(['dist']),
        // 把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        //html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login', '登录')),
        new HtmlWebpackPlugin(getHtmlConfig('user-register', '注册')),
        new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset', '找回密码')),
        new HtmlWebpackPlugin(getHtmlConfig('user-center', '个人中心')),
        new HtmlWebpackPlugin(getHtmlConfig('user-article', '我的文章')),
        new HtmlWebpackPlugin(getHtmlConfig('user-collection', '我的收藏')),
        new HtmlWebpackPlugin(getHtmlConfig('user-follows', '我的关注')),
        new HtmlWebpackPlugin(getHtmlConfig('user-fans', '我的粉丝')),
        new HtmlWebpackPlugin(getHtmlConfig('list', '搜索列表')),
        new HtmlWebpackPlugin(getHtmlConfig('article-write', '写文章')),
        new HtmlWebpackPlugin(getHtmlConfig('article-update', '编辑文章')),
        new HtmlWebpackPlugin(getHtmlConfig('article-detail', '文章详情')),
        new HtmlWebpackPlugin(getHtmlConfig('uni-article-detail', '文章详情')),
        new HtmlWebpackPlugin(getHtmlConfig('player', '播放测试')),
    ]
}

module.exports = config