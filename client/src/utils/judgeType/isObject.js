export default function(target) {
  return Object.prototype.toString.call(target) === '[object Object]';
}
