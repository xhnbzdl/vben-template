/**
 * 用于打包时会生成额外的配置文件。该文件可以配置一些全局变量，这样就可以直接从外部更改，而无需重新打包
 */
import { GLOB_CONFIG_FILE_NAME, OUTPUT_DIR } from '../constant'
import fs, { writeFileSync } from 'fs-extra'
import colors from 'picocolors'

import { getEnvConfig, getRootPath } from '../utils'
import { getConfigFileName } from '../getConfigFileName'

import pkg from '../../package.json'

interface CreateConfigParams {
  /** windows 对象下的存储配置的属性名 */
  configName: string
  /** 存储配置的对象 */
  config: any
  /** JS 文件名 */
  configFileName?: string
}

function createConfig(params: CreateConfigParams) {
  const { configName, config, configFileName } = params
  try {
    const windowConf = `window.${configName}`
    // 确保变量不会被修改
    let configStr = `${windowConf}=${JSON.stringify(config)};`
    configStr += `
      Object.freeze(${windowConf});
      Object.defineProperty(window, "${configName}", {
        configurable: false,
        writable: false,
      });
    `.replace(/\s/g, '')
    // 创建 dist 文件夹
    fs.mkdirp(getRootPath(OUTPUT_DIR))
    // 将字符串写入到 dist 文件下的指定JS文件名的文件中
    writeFileSync(getRootPath(`${OUTPUT_DIR}/${configFileName}`), configStr)

    console.log(colors.cyan(`✨ [${pkg.name}]`) + ` - configuration file is build successfully:`)
    console.log(colors.gray(OUTPUT_DIR + '/' + colors.green(configFileName)) + '\n')
  } catch (error) {
    console.log(colors.red('configuration file configuration file failed to package:\n' + error))
  }
}

export function runBuildConfig() {
  const config = getEnvConfig()
  const configFileName = getConfigFileName(config)
  createConfig({ config, configName: configFileName, configFileName: GLOB_CONFIG_FILE_NAME })
}
