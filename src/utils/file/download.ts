import { openWindow } from '..'
import { dataURLtoBlob, urlToBase64 } from './base64Conver'

/**
 * 下载在线图片
 * @param url
 * @param filename
 * @param mime
 * @param bom
 */
export function downloadByOnlineUrl(url: string, filename: string, mime?: string, bom?: BlobPart) {
  urlToBase64(url).then((base64) => {
    downloadByBase64(base64, filename, mime, bom)
  })
}

/**
 * 根据 base64 字符串 ，下载图片
 * @param buf
 * @param filename
 * @param mime
 * @param bom
 */
export function downloadByBase64(buf: string, filename: string, mime?: string, bom?: BlobPart) {
  const base64Buf = dataURLtoBlob(buf)
  downloadByData(base64Buf, filename, mime, bom)
}

/**
 * 根据后台界面文件流进行下载
 * @param {*} data 可以是一个字符串、数组或其他 BlobPart 数据类型
 * @param {*} filename 要下载的文件的名称
 * @param {*} mime 文件的 MIME 类型
 * @param {*} bom 可选的 BOM（字节顺序标记），通常用于文本文件，比如 UTF-8 文件.如果提供 BOM，它将在数据前面添加。
 */
export function downloadByData(data: BlobPart, filename: string, mime?: string, bom?: BlobPart) {
  // 创建一个 Blob 对象，将数据和可选的 BOM 放入其中，指定 MIME 类型
  const blobData = typeof bom !== 'undefined' ? [bom, data] : [data]
  const blob = new Blob(blobData, { type: mime || 'application/octet-stream' })
  // 创建一个临时的 URL，该 URL 包含生成的 Blob 数据。
  const blobURL = window.URL.createObjectURL(blob)
  // 创建一个隐藏的 <a> 元素 tempLink
  const tempLink = document.createElement('a')
  tempLink.style.display = 'none'
  // 设置 tempLink 的 href 属性为临时 URL，这样点击链接将触发文件下载。
  tempLink.href = blobURL
  // 指定下载的文件名
  tempLink.setAttribute('download', filename)
  // 如果浏览器不支持 download 属性
  if (typeof tempLink.download === 'undefined') {
    tempLink.setAttribute('target', '_blank')
  }
  // 将 tempLink 元素附加到页面的 <body> 元素中
  document.body.appendChild(tempLink)
  // 触发 tempLink.click() 以模拟用户点击链接
  tempLink.click()
  // 从页面中移除 tempLink 元素
  document.body.removeChild(tempLink)
  // 释放之前创建的临时 URL
  window.URL.revokeObjectURL(blobURL)
}

/**
 * 根据浏览器类型和支持情况，使用不同的下载方法，包括直接下载和在新标签页中打开链接
 * @param fileName 表示要保存的文件名。这是可选的，如果不提供，函数将尝试从 URL 中提取文件名。
 * @returns
 */
export function downloadByUrl({
  url,
  target = '_blank',
  fileName,
}: {
  url: string
  target?: TargetContext
  fileName?: string
}): boolean {
  // 判断是否为 Chrome 和 Safari 浏览器
  const isChrome = window.navigator.userAgent.toLowerCase().indexOf('chrome') > -1
  const isSafari = window.navigator.userAgent.toLowerCase().indexOf('safari') > -1

  // 如果浏览器为 iOS（通过检查 /(iP)/g），则不支持下载，会在控制台输出错误信息，并返回 false。
  if (/(iP)/g.test(window.navigator.userAgent)) {
    console.error('您的浏览器不支持下载！')
    return false
  }
  if (isChrome || isSafari) {
    const link = document.createElement('a')
    link.href = url
    link.target = target

    // 设置 download 属性为提供的 fileName 或从 URL 中提取的文件名。
    if (link.download !== undefined) {
      link.download = fileName || url.substring(url.lastIndexOf('/') + 1, url.length)
    }

    // 如果浏览器支持 document.createEvent，创建一个鼠标事件并分派（dispatch）给 <a> 元素，
    // 以模拟用户点击下载链接。然后返回 true 表示下载已触发。
    if (document.createEvent) {
      const e = document.createEvent('MouseEvents')
      e.initEvent('click', true, true)
      link.dispatchEvent(e)
      return true
    }
  }

  // 如果 URL 中不包含 ?，则在 URL 中添加 ?download 参数，以确保可以正确下载文件
  if (url.indexOf('?') === -1) {
    url += '?download'
  }

  // 在新标签页中打开链接
  openWindow(url, { target })
  return true
}
