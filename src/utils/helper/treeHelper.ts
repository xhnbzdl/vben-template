/** 树工具类的操作字段类型 */
interface TreeHelperConfig {
  id: string
  children: string
  pid: string
}

/** 默认配置 */
const DEFAULT_CONFIG: TreeHelperConfig = {
  id: 'id',
  children: 'children',
  pid: 'pid',
}

// 获取配置。  Object.assign 从一个或多个源对象复制到目标对象
const getConfig = (config: Partial<TreeHelperConfig>) => Object.assign({}, DEFAULT_CONFIG, config)

/**
 * 将扁平的列表数据转换为树形结构
 * @param list
 * @param config
 * @returns
 */
export function listToTree<T = any>(list: any[], config: Partial<TreeHelperConfig> = {}): T[] {
  // 通过配置信息从 config 中获取属性名
  const conf = getConfig(config) as TreeHelperConfig
  const { id, children, pid } = conf
  // 用于将节点的 ID 映射到节点对象
  const nodeMap = new Map()
  // 将扁平的列表数据转换为树形结构
  const result: T[] = []
  // 将子节点属性初始化为空数组，然后将节点的 ID 映射到 nodeMap 中
  for (const node of list) {
    node[children] = node[children] || []
    nodeMap.set(node[id], node)
  }
  // 从 nodeMap 中获取其父节点，并将当前节点添加到父节点的子节点数组中
  // 如果没有父节点，将节点添加到 result 数组中。
  for (const node of list) {
    const parent = nodeMap.get(node[pid])
    if (parent) {
      parent[children].push(node)
    } else {
      result.push(node)
    }
  }
  return result
}

/**
 * 将树形结构数据转换为扁平的列表数据
 * @param tree
 * @param config
 * @returns
 */
export function treeToList<T = any>(tree: any, config: Partial<TreeHelperConfig> = {}): T {
  // 从配置中获取 children 属性名称
  config = getConfig(config)
  const { children } = config
  // 将初始树的根节点（或根节点数组）复制到 result 数组中。
  const result: any = [...tree]
  // 通过splice插入元素，动态改变了result.length，从而实现了递归遍历子数据的效果
  for (let i = 0; i < result.length; i++) {
    // 不存在子节点直接跳过
    if (!result[i][children!]) {
      continue
    }
    // 将当前节点的子节点插入到 result 数组中的位置 i + 1，实现了深度优先遍历树结构，确保子节点在父节点之后插入
    result.splice(i + 1, 0, ...result[i][children!])
  }
  return result
}

/**
 * 在树形结构数据中查找满足特定条件的第一个节点
 * @param tree
 * @param func
 * @param config
 * @returns
 */
export function findNode<T = any>(
  tree: any,
  func: Fn,
  config: Partial<TreeHelperConfig> = {},
): T | null {
  // 从配置中获取 children 属性名称
  config = getConfig(config)
  const { children } = config
  // 将根节点或根节点数组复制到该列表中
  const list = [...tree]
  for (const node of list) {
    if (func(node)) {
      return node
    }
    // 如果节点有子节点（通过 node[children] 检查），则将这些子节点添加到 list 列表中，以便继续查找。
    // 动态添加子节点，从而实现了递归子数据来匹配的效果
    if (node[children!]) {
      list.push(...node[children!])
    }
  }
  return null
}

/**
 * 查找满足特定条件的所有节点
 * @param tree
 * @param func
 * @param config
 * @returns
 */
export function findNodeAll<T = any>(
  tree: any,
  func: Fn,
  config: Partial<TreeHelperConfig> = {},
): T[] {
  // 第一个匹配的节点
  config = getConfig(config)
  const { children } = config
  // 将根节点或根节点数组复制到该列表中
  const list = [...tree]
  const result: T[] = []
  for (const node of list) {
    // 将满足条件的节点添加到 result
    if (func(node)) {
      result.push(node)
    }
    // 将子节点添加到 list 列表中，以便继续查找
    if (node[children!]) {
      list.push(...node[children!])
    }
  }
  return result
}

/**
 * 查找满足特定条件的第一个节点，并返回节点的路径
 * @param tree
 * @param func
 * @param config
 * @returns
 */
export function findPath<T = any>(
  tree: any,
  func: Fn,
  config: Partial<TreeHelperConfig> = {},
): T | T[] | null {
  // 从配置中获取 children 属性名称
  config = getConfig(config)
  const { children } = config
  // 用于存储找到的节点的路径
  const path: T[] = []
  // 将根节点或根节点数组复制到该列表中
  const list = [...tree]
  // 用于跟踪已访问的节点，以避免循环
  const visitedSet = new Set()
  // 只要 list 列表中有节点，就继续循环
  while (list.length) {
    const node = list[0]
    // 存在，表示它已被访问过
    if (visitedSet.has(node)) {
      // 将从 path 中移除最后一个节点（因为我们已经离开了这个节点的路径），然后从 list 中移除这个节点。
      path.pop()
      list.shift()
    } else {
      // 添加到访问列表中
      visitedSet.add(node)
      // 将其子节点（如果存在）添加到 list 的开头，以便继续遍历这些子节点。
      if (node[children!]) {
        list.unshift(...node[children!])
      }
      // 将当前的 node 添加到 path 中，以构建路径
      path.push(node)
      // 如果当前节点满足条件，则返回当前的 path
      if (func(node)) {
        return path
      }
    }
  }
  return null
}

/**
 * 查找满足特定条件所有节点，并返回节点的路径
 * @param tree
 * @param func
 * @param config
 * @returns
 */
export function findPathAll(tree: any, func: Fn, config: Partial<TreeHelperConfig> = {}) {
  // 从配置中获取 children 属性名称
  config = getConfig(config)
  const { children } = config
  // 用于存储找到的节点的路径
  const path: any[] = []
  // 将根节点或根节点数组复制到该列表中
  const list = [...tree]
  // 用于跟踪已访问的节点，以避免循环
  const visitedSet = new Set()
  // 用于存储结果
  const result: any[] = []
  // 只要 list 列表中有节点，就继续循环
  while (list.length) {
    const node = list[0]
    // 存在，表示它已被访问过
    if (visitedSet.has(node)) {
      // 将从 path 中移除最后一个节点（因为我们已经离开了这个节点的路径），然后从 list 中移除这个节点。
      path.pop()
      list.shift()
    } else {
      // 添加到访问列表中
      visitedSet.add(node)
      // 将其子节点（如果存在）添加到 list 的开头，以便继续遍历这些子节点。
      if (node[children!]) {
        list.unshift(...node[children!])
      }
      // 将当前的 node 添加到 path 中，以构建路径
      path.push(node)
      if (func(node)) {
        result.push([...path])
      }
    }
  }
  return result
}

/**
 * 过滤树形结构中的节点，只保留满足特定条件的节点
 * @param tree
 * @param func
 * @param config
 * @returns
 */
export function filter<T = any>(
  tree: T[],
  func: (n: T) => boolean,
  // Partial 将 T 中的所有属性设为可选
  config: Partial<TreeHelperConfig> = {},
): T[] {
  // 从配置中获取 children 属性名称
  config = getConfig(config)
  const children = config.children as string

  // 递归地处理该列表中的节点
  function listFilter(list: T[]) {
    return (
      list
        // 首先使用 map 函数对节点列表进行浅复制，以确保不会影响原始数据。
        .map((node: any) => {
          // 扩展运算符浅拷贝
          return { ...node }
        })
        .filter((node) => {
          // 递归调用 对含有children项  进行再次调用自身函数 listFilter
          if (node[children]) {
            node[children] = listFilter(node[children])
          }
          // 只有满足条件的节点或拥有子节点的节点才会被保留在结果中。
          return func(node) || (node[children] && node[children].length)
        })
    )
  }

  return listFilter(tree)
}

/**
 * 遍历树形结构的函数，它使用深度优先遍历的方式
 * @param tree
 * @param func
 * @param config
 * @returns
 */
export function forEach<T = any>(
  tree: T[],
  func: (n: T) => any,
  config: Partial<TreeHelperConfig> = {},
): void {
  // 从配置中获取 children 属性名称
  config = getConfig(config)
  const { children } = config
  // 将根节点或根节点数组复制到该列表中
  const list: any[] = [...tree]
  for (let i = 0; i < list.length; i++) {
    //func 返回true就终止遍历，避免大量节点场景下无意义循环，引起浏览器卡顿
    if (func(list[i])) {
      return
    }

    if (children) {
      if (list[i][children]) {
        // 将当前节点的子节点插入到 list 数组中的位置 i + 1，实现了深度优先遍历树结构，确保子节点在父节点之后插入
        list.splice(i + 1, 0, ...list[i][children])
      }
    }
  }
}

/**
 * 遍历树形结构并对每个节点进行转换操作，并返回一个经过转换后的树形结构
 * @param treeData
 * @param opt
 * @returns
 */
export function treeMap<T = any>(treeData: T[], opt: { children?: string; conversion: Fn }): T[] {
  return treeData.map((item) => treeMapEach(item, opt))
}

/**
 * 对节点进行转换操作
 * @param data
 * @param conversion 回调函数，用于对每个节点进行转换操作。
 * @returns
 */
export function treeMapEach(
  data: any,
  { children = 'children', conversion }: { children?: string; conversion: Fn },
) {
  // 检查当前节点是否有子节点
  const haveChildren = Array.isArray(data[children]) && data[children].length > 0
  // 对当前节点进行转换
  const conversionData = conversion(data) || {}
  // 如果有子节点
  if (haveChildren) {
    // 使用扩展运算符进行浅复制
    return {
      ...conversionData,
      // 对子节点进行递归转换
      [children]: data[children].map((i) =>
        treeMapEach(i, {
          children,
          conversion,
        }),
      ),
    }
  } else {
    return {
      ...conversionData,
    }
  }
}

/**
 * 递归遍历树结构
 * @param treeDatas 树
 * @param callBack 回调
 * @param parentNode 父节点
 */
export function eachTree(treeDatas: any[], callBack: Fn, parentNode = {}) {
  treeDatas.forEach((element) => {
    const newNode = callBack(element, parentNode) || element
    if (element.children) {
      eachTree(element.children, callBack, newNode)
    }
  })
}
