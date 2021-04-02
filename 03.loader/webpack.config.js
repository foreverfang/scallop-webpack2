const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                // loader: path.resolve(__dirname, 'loaders', 'loader1')
                // loader: 'loader1'
                // loader执行顺序：从下到上，从右到左
                use: [
                    'loader1',
                    'loader2',
                    {
                        loader: 'loader3',
                        options: {
                            name: 'fang',
                            age: 18
                        }
                    }
                ]
            }
        ]
    },
    // 配置loader的解析规则
    resolveLoader: {
        modules: [
            'node_modules',
            path.resolve(__dirname, 'loaders')
        ]
    }
}
