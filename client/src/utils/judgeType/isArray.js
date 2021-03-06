/**
 * 判断传入的对象是否为Array
 * @param {any} target
 */
export default function(target) {
  if (Array.isArray) {
    return Array.isArray(target);
  } else {
    return Object.prototype.toString.call(target) === '[object Array]';
  }
}
