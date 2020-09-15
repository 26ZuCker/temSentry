/**
 * 获取文件名和模块
 * @param {String} dir 文件的绝对目录
 */
function loaderApi(dir) {
  const res = {};
  const absPath = path.resolve(__dirname, dir);
  //同步获取所有文件名，不是模块
  console.log(require.context(absPath));
  const files = fs.readFileSync(absPath);
  files.forEach((filename) => {
    //去除后缀
    filename = filename.replace('.js', '');
    //入口文件则不需要导入
    if (filename !== 'initApi') {
      //获取文件module
      const fileModule = import(`${url}/${filename}`);
      //执行回调
      res[filename] = fileModule;
    }
  });
  return res;
}
export default loaderApi;
