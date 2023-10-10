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
    "@iconify/json": "^2.1.30",
    "@purge-icons/generated": "^0.8.1",
    // ts类型库
    "@types/codemirror": "^5.60.5",
    "@types/crypto-js": "^4.1.1",
    "@types/fs-extra": "^9.0.13",
    "@types/inquirer": "^8.2.1",
    "@types/intro.js": "^3.0.2",
    "@types/lodash-es": "^4.17.6",
    "@types/mockjs": "^1.0.6",
    "@types/node": "^17.0.25",
    "@types/nprogress": "^0.2.0",
    "@types/qs": "^6.9.7",
    "@types/showdown": "^1.9.4",
    "@types/sortablejs": "^1.10.7",
    // eslint校验
    "@typescript-eslint/eslint-plugin": "^5.20.0",
    "@typescript-eslint/parser": "^5.20.0",
    // vite
    "@vitejs/plugin-legacy": "^1.8.1",
    "@vitejs/plugin-vue": "^2.3.1",
    "@vitejs/plugin-vue-jsx": "^1.3.10",
    // vue
    "@vue/compiler-sfc": "^3.2.33",
    "@vue/test-utils": "^2.0.0-rc.21",
    "autoprefixer": "^10.4.4",
    "conventional-changelog-cli": "^2.2.2",
    "cross-env": "^7.0.3",
    "cz-git": "^1.3.11",
    "czg": "^1.3.11",
    "dotenv": "^16.0.0",
    "eslint": "^8.13.0",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-prettier": "^4.0.0",
    "eslint-plugin-vue": "^8.6.0",
    "esno": "^0.14.1",
    "fs-extra": "^10.1.0",
    "husky": "^7.0.4",
    "inquirer": "^8.2.2",
    "less": "^4.1.2",
    // 针对暂存文件进行lint操作
    "lint-staged": "12.3.7",
    "npm-run-all": "^4.1.5",
    "picocolors": "^1.0.0",
    "postcss": "^8.4.12",
    "postcss-html": "^1.4.1",
    "postcss-less": "^6.0.0",
    "prettier": "^2.6.2",
    // 脚本删除文件
    "rimraf": "^3.0.2",
    "rollup": "^2.70.2",
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
    "vite-plugin-compression": "^0.5.1",
    "vite-plugin-html": "^3.2.0",
    "vite-plugin-imagemin": "^0.6.1",
    "vite-plugin-mkcert": "^1.6.0",
    "vite-plugin-mock": "^2.9.6",
    "vite-plugin-purge-icons": "^0.8.1",
    "vite-plugin-pwa": "^0.11.13",
    "vite-plugin-style-import": "^2.0.0",
    "vite-plugin-svg-icons": "^2.0.1",
    "vite-plugin-theme": "^0.8.6",
    "vite-plugin-vue-setup-extend": "^0.4.0",
    "vite-plugin-windicss": "^1.8.4",
    "vue-eslint-parser": "^8.3.0",
    "vue-tsc": "^0.33.9"
  },
```
