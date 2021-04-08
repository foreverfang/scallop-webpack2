const fs = require('fs')
const babelParser = require('@babel/parser')
const traverse = require('@babel/traverse')

function myWebpack(config) {
    return new Compiler(config)
}

class Compiler {
    constructor(options = {}) {
        this.options = options
    }

    // 启动webpack打包
    run() {
        // 1.读取入口文件内容
        // 入口文件路径
        const filePath = this.options.entry
        const file = fs.readFileSync(filePath, 'utf-8')
        // 2.将其解析成ast抽象语法树
        const ast = babelParser.parse(file, {
            sourceType: 'module'
        })
        // debugger
        console.log(ast)

        // 获取到文件的文件夹路径

        // 收集依赖
        traverse(ast, {
            // 内部会遍历 ast 中 program.body，判断里面语句类型
            // 如果 type：ImportDeclaration 就会触发当前函数
            ImportDeclaration({ node }) {
                // 文件相对路径: './add.js'
                const relativePath = node.source.value
            }
        })
    }
}

module.exports = myWebpack;