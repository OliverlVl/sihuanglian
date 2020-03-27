import CryptoJS from 'crypto-js'

const key = CryptoJS.enc.Utf8.parse(process.env.VUE_APP_DATA_TRANSFER_SECRET_KEY); // 十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse(process.env.VUE_APP_DATA_TRANSFER_SECRET_IV); // 十六位十六进制数作为密钥偏移量

/**
 * 数据传输加密解密
 * @param word
 * @returns {string}
 * @constructor
 */
// 解密方法
function Decrypt (word) {
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  let decrypt = CryptoJS.AES.decrypt(srcs, key, {iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

// 加密方法
function Encrypt (word) {
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7});
  return encrypted.ciphertext.toString();
}

export default {
  Decrypt,
  Encrypt
}
