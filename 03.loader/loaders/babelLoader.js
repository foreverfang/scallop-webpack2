const { getOptions } = require('loader-utils')
const { validate } = require('schema-utils')
const babel = require('@babel/core')
const util = require('util')

const babelSchema = require('./babelSchema.json')

// babel.transform用来编译代码的方法
// 是一个普通异步方法
// util.promisify 将普通异步方法转换成基于promise的异步方法
const transform = util.promisify(babel.transform)

module.exports = function(content, map, meta){
  // 获取loader的options配置
  const options = getOptions(this) || {};
  // 校验babel的optinos的配置
  validate(babelSchema, options, {
    name: 'Babel Loader'
  });

  // 创建异步loader
  const callback = this.async();

  // 使用babel编译代码
  transform(content, options)
    .then(({code, map}) => callback(null, code, map, meta))
    .catch(e => callback(e))
}
