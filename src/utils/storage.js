const INFO_KEY = 'userInfo'
const HISTORY_KEY = 'history'
export const getInfo = () => {
  const defaultInfo = { userId: '', token: '' }
  const result = localStorage.getItem(INFO_KEY)
  return result ? JSON.parse(result) : defaultInfo
}
export const getHistory = () => {
  const result = localStorage.getItem(HISTORY_KEY)
  return result ? JSON.parse(result) : []
}
export const setInfo = (info) => {
  localStorage.setItem(INFO_KEY, JSON.stringify(info))
}
export const setHistory = (history) => {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
}
export const removeInfo = () => {
  localStorage.removeItem(INFO_KEY)
}
export const removeHistory = () => {
  localStorage.removeItem(HISTORY_KEY)
}
