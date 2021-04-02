// loader本质上是一个函数

// 同步loader
// module.exports = function (content, map, meta) {
//     console.log(111)
//     return content;
// }

module.exports = function (content, map, meta) {
    console.log(111)

    this.callback(null, content, map, meta)
}

// 执行顺序跟loader相反
module.exports.pitch = function () {
    console.log('pitch 1111')
}