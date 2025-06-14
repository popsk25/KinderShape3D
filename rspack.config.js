const path = require("path");
const { defineConfig } = require("@rspack/cli");
const HtmlRspackPlugin = require("html-rspack-plugin");
const rspack = require("@rspack/core");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = defineConfig({
    mode: "development",
    entry: {
        main: "./packages/chili-web/src/index.ts",
        iconfont: "./public/iconfont.js",
        styles: "./public/index.css",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        publicPath: "./",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: {
                    loader: "builtin:swc-loader",
                    options: {
                        sourceMap: true,
                        jsc: {
                            parser: {
                                syntax: "typescript",
                                tsx: true,
                                decorators: true,
                            },
                            target: "es2020",
                            transform: {
                                react: {
                                    runtime: "automatic",
                                },
                            },
                        },
                    },
                },
                exclude: /node_modules/,
            },
            {
                test: /\.module\.css$/,
                type: "css/module",
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /(?<!\.module)\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(png|jpg|gif|svg|cur)$/,
                type: "asset/resource",
            },
            {
                test: /\.wasm$/,
                type: "asset/resource",
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json", ".css"],
        alias: {
            "@chili/core": path.resolve(__dirname, "packages/chili-core/src"),
            "@chili/ui": path.resolve(__dirname, "packages/chili-ui/src"),
            "@chili/builder": path.resolve(__dirname, "packages/chili-builder/src"),
        },
    },
    experiments: {
        asyncWebAssembly: true,
        css: true,
    },
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        compress: true,
        port: 3000,
        host: "0.0.0.0",
        hot: true,
        historyApiFallback: true,
    },
    plugins: [
        new HtmlRspackPlugin({
            template: "./public/index.html",
        }),
        new rspack.CopyRspackPlugin({
            patterns: [
                {
                    from: "./public",
                    globOptions: {
                        ignore: ["**/**/index.html", "**/**/index.css", "**/**/iconfont.js"],
                    },
                },
            ],
        }),
        new MiniCssExtractPlugin(),
    ],
    devtool: "source-map",
});
