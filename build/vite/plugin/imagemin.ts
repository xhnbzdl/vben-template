// 用于压缩生产环境输出的图像资源文件
// https://github.com/anncwb/vite-plugin-imagemin
import viteImagemin from 'vite-plugin-imagemin'

export function configImageminPlugin() {
  const plugin = viteImagemin({
    // gif 图片压缩
    gifsicle: {
      // 选择0到7之间的优化级别
      optimizationLevel: 7,
      // 隔行扫描 gif 进行渐进式渲染
      interlaced: false,
    },
    // png
    optipng: {
      // 选择0到7之间的优化级别
      optimizationLevel: 7,
    },
    // jpeg
    mozjpeg: {
      // 压缩质量，范围从0(最差)到100(最佳)。
      quality: 20,
    },
    // png
    pngquant: {
      // Min和max是介于0(最差)到1(最佳)之间的数字，类似于JPEG。
      // 达到或超过最高质量所需的最少量的颜色。如果转换导致质量低于最低质量，图像将不会被保存。
      quality: [0.8, 0.9],
      // 压缩速度，1(强力)到11(最快)
      speed: 4,
    },
    // svg压缩
    svgo: {
      plugins: [
        {
          name: 'removeViewBox',
        },
        {
          name: 'removeEmptyAttrs',
          active: false,
        },
      ],
    },
  })
  return plugin
}
