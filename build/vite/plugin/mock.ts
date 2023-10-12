/**
 * 用于开发和生产的API模拟插件
 * https://github.com/anncwb/vite-plugin-mock
 */
import { viteMockServe } from 'vite-plugin-mock'

export function configMockPlugin(isBuild: boolean) {
  return viteMockServe({
    // 忽略以_开头的文件
    ignore: /^\_/,
    // 解析根目录下的 mock 文件夹
    mockPath: 'mock',
    localEnabled: !isBuild,
    prodEnabled: isBuild,
    injectCode: `
      import { setupProdMockServer } from '../mock/_createProductionServer';

      setupProdMockServer();
      `,
  })
}
