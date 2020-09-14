import { reject, resolve } from 'core-js/fn/promise';

/**
 * 对wx内置函数进行promise化
 * @param fn
 */
const promisify = (fn, cb) =>
  new Promise((resolve, reject) => {
    fn({
      success: {},
    });
  });

export default promisify;
