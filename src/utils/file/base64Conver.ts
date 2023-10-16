/**
 * base64 位字符串转换位 blob 对象
 */
export function dataURLtoBlob(base64Buf: string): Blob {
  const arr = base64Buf.split(',')
  // data:image/png;base64
  const typeItem = arr[0]
  // 从类型信息中提取 MIME 类型，即数据的类型（例如，image/png）
  const mime = typeItem.match(/:(.*?);/)![1]
  // 使用 window.atob 方法将 Data URL 的 Base64 编码数据部分解码为二进制字符串
  const bstr = window.atob(arr[1])
  // 创建一个新的 Uint8Array 数组 u8arr，其长度与解码后的二进制字符串相同
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  // 使用循环将解码后的二进制字符串中的字符代码值复制到 u8arr 数组中
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  // 使用 Blob 构造函数创建一个 Blob 对象，将 u8arr 数组传递给构造函数，并提供 MIME 类型
  return new Blob([u8arr], { type: mime })
}

/**
 * 将给定的 URL 中的图像加载并转换为 Base64 编码的数据
 * @param url
 */
export function urlToBase64(url: string, mineType?: string): Promise<string> {
  return new Promise((resolve, reject) => {
    // 创建一个 HTML5 Canvas 元素 canvas 以及获取它(canvas)的 2D 上下文 ctx 。
    // Canvas 用于在内存中绘制图像
    let canvas = document.createElement('CANVAS') as Nullable<HTMLCanvasElement>
    const ctx = canvas!.getContext('2d')

    // 创建一个新的 Image 对象 img，用于加载指定 URL 中的图像
    const img = new Image()
    // 确保可以跨域加载图像
    img.crossOrigin = ''
    // 当图像加载完成时执行以下操作
    img.onload = function () {
      if (!canvas || !ctx) {
        return reject()
      }
      // 设置 canvas 的高度和宽度，以匹配加载的图像的高度和宽度
      canvas.height = img.height
      canvas.width = img.width
      // 使用 ctx.drawImage 方法将图像绘制到 Canvas 上
      ctx.drawImage(img, 0, 0)
      // 将 Canvas 中的内容转换为 Base64 编码的数据。如果未提供 MIME 类型，则默认使用 'image/png'
      const dataURL = canvas.toDataURL(mineType || 'image/png')
      // 释放内存资源
      canvas = null
      // 返回 Base64 数据
      resolve(dataURL)
    }
    // 设置 img 的 src 为指定的 URL ，从而触发图像加载
    img.src = url
  })
}
