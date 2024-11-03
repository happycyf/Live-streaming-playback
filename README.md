
## 开发软件选用

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## 安装命令

```sh
npm install
```

### 运行命令
运行前请先去 /src/components//views/show.vue 的154行更改为服务器地址 搭建环境请参考[后台](https://github.com/happycyf/Live-streaming-software) [服务器](https://github.com/happycyf/Live-streaming-backend)
```sh
npm run dev
```
