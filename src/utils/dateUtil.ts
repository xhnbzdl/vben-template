/**
 * 独立的时间操作工具，便于切换到 dayjs
 */
import dayjs from 'dayjs'

// 时间格式
const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'
const DATE_FORMAT = 'YYYY-MM-DD'

/** 格式化时间(YYYY-MM-DD HH:mm:ss) */
export function formatToDateTime(
  date: dayjs.Dayjs | undefined = undefined,
  format = DATE_TIME_FORMAT,
): string {
  return dayjs(date).format(format)
}

/** 格式化时间(YYYY-MM-DD) */
export function formatToDate(
  date: dayjs.Dayjs | undefined = undefined,
  format = DATE_FORMAT,
): string {
  return dayjs(date).format(format)
}

export const dateUtil = dayjs
