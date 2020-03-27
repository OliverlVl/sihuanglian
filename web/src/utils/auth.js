import systemApi from './systemApi'

const TokenKey = 'User-Token'
const ExpireTime = 'ExpireTime'

const authUtils = {
  getToken,
  setToken,
  removeToken,
  getExpiredTime,
  setExpiredTime
}

export function getToken () {
  return systemApi.getValue(TokenKey)
}

export function setToken (token) {
  return systemApi.setValue(TokenKey, token)
}

export function removeToken () {
  return systemApi.remove(TokenKey)
}

export function getExpiredTime () {
  return systemApi.getValue(ExpireTime);
}

export function setExpiredTime () {
  let time = new Date(new Date().getTime() + 20 * 60 * 1000);
  // console.log(time);
  return systemApi.setValue(ExpireTime, time.getTime());
}

export default authUtils
