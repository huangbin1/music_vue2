### 使用npm安装依赖模块可能会很慢，建议换成cnpm
````sh
	npm install -g cnpm --registry=http://registry.npm.taobao.org

	# 安装依赖模块
	cnpm install
````
### 初始化项目，安装webpack依赖
```sh
	npm init 
	npm install webpack --save-dev
````
### 安装webpack的几个loader：
````sh
	npm install file-loader css-loader style-loader url-loader --save-dev
````
### webpack 一些其他常用的命令
````sh
	webpack #最基本的启动webpack命令
	webpack -w #提供watch方法，实时进行打包更新
	webpack -p #对打包后的文件进行压缩
	webpack -d #提供SourceMaps，方便调试
	webpack --colors #输出结果带彩色，比如：会用红色显示耗时较长的步骤
	webpack --profile #输出性能数据，可以看到每一步的耗时
	webpack --display-modules #默认情况下 node_modules 下的模块会被隐藏，加上这个参数可以显示这些被隐藏的模块
````
### webpack-dev-server  是个好工具,会监听文件变化，然后执行webpack，并刷新web服务器
````sh
	# 安装
	npm install webpack-dev-server -g

	# 运行
	webpack-dev-server
````
在浏览器打开http://localhost:8080/或 http://localhost:8080/webpack-dev-server/ 可以浏览项目中的页面
### 安装vue依赖
````sh
	npm install vue -save
````