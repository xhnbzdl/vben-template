# 脚本命令

```json
"scripts": {
  // 安装依赖
  "bootstrap": "pnpm install",
  // 构建项目
  "build": "cross-env NODE_ENV=production NODE_OPTIONS=--max-old-space-size=8192 pnpm vite build",
  // 生成打包分析，在电脑上执行完成后会自动打开界面
  "build:analyze": "cross-env NODE_OPTIONS=--max-old-space-size=8192 pnpm vite build --mode analyze",
  // 构建成docker镜像
  "build:docker": "vite build --mode docker",
  // 清空缓存后构建项目
  "build:no-cache": "pnpm clean:cache && npm run build",
  "build:test": "cross-env NODE_OPTIONS=--max-old-space-size=8192 pnpm vite build --mode test",
  // 用于生成标准化的git commit message
  "commit": "czg",
  // 运行项目
  "dev": "pnpm vite",
  "preinstall": "npx only-allow pnpm",
  "postinstall": "turbo run stub",
  "lint": "turbo run lint",
  // 执行 eslint 校验，并修复部分问题
  "lint:eslint": "eslint --cache --max-warnings 0  \"{src,mock}/**/*.{vue,ts,tsx}\" --fix",
  // 执行 prettier 格式化（该命令会对项目所有代码进行 prettier 格式化，请谨慎执行）
  "lint:prettier": "prettier --write .",
  // 执行 stylelint 格式化
  "lint:stylelint": "stylelint \"**/*.{vue,css,less,scss}\" --fix --cache --cache-location node_modules/.cache/stylelint/",
  // 安装git hooks
  "prepare": "husky install",
  // 预览打包后的内容（先打包在进行预览）
  "preview": "npm run build && vite preview",
  // 删除node_modules，重新安装依赖
  "reinstall": "rimraf pnpm-lock.yaml && rimraf package.lock.json && rimraf node_modules && npm run bootstrap",
  // 运行项目
  "serve": "npm run dev",
  // 对打包结果进行 gzip 测试
  "test:gzip": "npx http-server dist --cors --gzip -c-1",
  // 类型检查
  "type:check": "vue-tsc --noEmit --skipLibCheck"
},
```

# 开发依赖

```json
"devDependencies": {
    // git代码提交校验
    "@commitlint/cli": "^16.2.3",
    "@commitlint/config-conventional": "^16.2.1",
    // Iconify图标集
    "@iconify/json": "^2.1.30",
    // 提取使用的图标名称，然后将图标的数据 (SVG) 捆绑到您的代码中
    "@purge-icons/generated": "^0.8.1",
    // ts类型库
    // 在线代码编辑器
    "@types/codemirror": "^5.60.5",
    // 加密工具
    "@types/crypto-js": "^4.1.1",
    // 文件操作工具
    "@types/fs-extra": "^9.0.13",
    // 交互式命令行工具
    "@types/inquirer": "^8.2.1",
    // 分步骤引导工具
    "@types/intro.js": "^3.0.2",
    "@types/lodash-es": "^4.17.6",
    "@types/mockjs": "^1.0.6",
    "@types/node": "^17.0.25",
	// 页面加载进度条
    "@types/nprogress": "^0.2.0",
    "@types/qs": "^6.9.7",
    // vue渲染markdown的组件
    "@types/showdown": "^1.9.4",
    // 拖拽库
    "@types/sortablejs": "^1.10.7",
    // eslint校验
    "@typescript-eslint/eslint-plugin": "^5.20.0",
    "@typescript-eslint/parser": "^5.20.0",
    // 与旧版浏览器兼容的vite插件
    "@vitejs/plugin-legacy": "^1.8.1",
    "@vitejs/plugin-vue": "^2.3.1",
    "@vitejs/plugin-vue-jsx": "^1.3.10",
    // vue
    "@vue/compiler-sfc": "^3.2.33",
    // 单元测试实用工具库
    "@vue/test-utils": "^2.0.0-rc.21",
    // 解决不同浏览器样式的兼容问题，自动补齐前缀
    "autoprefixer": "^10.4.4",
    "conventional-changelog-cli": "^2.2.2",
    // 运行跨平台设置和使用环境变量的脚本
    "cross-env": "^7.0.3",
    "cz-git": "^1.3.11",
    "czg": "^1.3.11",
    // 从.evn文件流Buffer中读取属性输出一个对象
    "dotenv": "^16.0.0",
    "eslint": "^8.13.0",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-prettier": "^4.0.0",
    "eslint-plugin-vue": "^8.6.0",
    "esno": "^0.14.1",
    // 添加未包含在本机fs模块中的文件系统方法
    "fs-extra": "^10.1.0",
    // git hook
    "husky": "^7.0.4",
    // 实现命令行交互式界面的工具
    "inquirer": "^8.2.2",
    "less": "^4.1.2",
    // 针对暂存文件进行lint操作
    "lint-staged": "12.3.7",
    "npm-run-all": "^4.1.5",
    // 可以在终端修改输出字符样式
    "picocolors": "^1.0.0",
    "postcss": "^8.4.12",
    "postcss-html": "^1.4.1",
    "postcss-less": "^6.0.0",
    // 代码格式化
    "prettier": "^2.6.2",
    // 脚本删除文件
    "rimraf": "^3.0.2",
    // JavaScript 模块打包器
    "rollup": "^2.70.2",
    // 打包分析插件
    "rollup-plugin-visualizer": "^5.6.0",
    // 样式检查插件
    "stylelint": "^14.7.1",
    "stylelint-config-prettier": "^9.0.3",
    "stylelint-config-recommended": "^7.0.0",
    "stylelint-config-recommended-vue": "^1.4.0",
    "stylelint-config-standard": "^25.0.0",
    // 检查样式编写顺序
    "stylelint-order": "^5.0.0",
    "ts-node": "^10.7.0",
    "typescript": "^4.6.3",
    "vite": "^2.9.5",
    // 使用 gzip 或者 brotli 来压缩资源
    "vite-plugin-compression": "^0.5.1",
    // 针对 index.html，提供压缩和基于 ejs 模板功能的 vite 插件，对 index.html 注入动态数据，例如替换网站标题
    "vite-plugin-html": "^3.2.0",
    // 用于打包压缩图片
    "vite-plugin-imagemin": "^0.6.1",
    // 配置本地https警告问题
    "vite-plugin-mkcert": "^1.6.0",
    "vite-plugin-mock": "^2.9.6",
    // 用于按需加载 SVG 图标
    "vite-plugin-purge-icons": "^0.8.1",
    // Progressive Web App 渐进式的网页应用程序，将你的vite项目变成pwa应用
    "vite-plugin-pwa": "^0.11.13",
    // 按需导入组件库样式的插件
    "vite-plugin-style-import": "^2.0.0",
    // 用于生成 svg 精灵贴图
    "vite-plugin-svg-icons": "^2.0.1",
    // 用于动态更改界面主题色的 vite 插件
    "vite-plugin-theme": "^0.8.6",
    "vite-plugin-vue-setup-extend": "^0.4.0",
    "vite-plugin-windicss": "^1.8.4",
    "vue-eslint-parser": "^8.3.0",
    "vue-tsc": "^0.33.9"
  },
```
