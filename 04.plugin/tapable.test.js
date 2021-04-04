const { SyncHook, SyncBailHook, AsyncParallelHook, AsyncSeriesHook } = require('tapable')

class Lesson {
  constructor(){
    // 初始化hooks容器
    this.hooks = {
      // 同步钩子，任务依次执行
      // go: new SyncHook(['address']),
      // SyncBailHook：一旦有返回值，就会退出
      go: new SyncBailHook(['address']),

      // 异步hooks
      // AsyncParallelHook：异步并行
      // leave: new AsyncParallelHook(['name', 'age']),
      // AsyncSeriesHook：异步串行
      leave: new AsyncSeriesHook(['name', 'age'])
    }
  }
  tap(){
    // 往hooks容器中注册事件/添加回调函数
    this.hooks.go.tap('scallop0818', (address)=>{
      console.log('scallop0818', address)
      return 111
    })

    this.hooks.go.tap('fang0914', (address)=>{
      console.log('fang0914', address)
    })


    this.hooks.leave.tapAsync('scallop01', (name, age, cb)=>{
      setTimeout(()=>{
        console.log('scallop01', name, age)
        cb()
      }, 1000)
    })

    this.hooks.leave.tapPromise('scallop02', (name, age)=>{
      return new Promise((resolve)=>{
        setTimeout(()=>{
          console.log('scallop02', name, age)
          resolve()
        }, 1000)
      })
    })
  }

  start(){
    // 触发hooks
    this.hooks.go.call('s818')
    this.hooks.leave.callAsync('scallop', 18, function(){
      // 代表所有leave容器中的函数触发完了，才触发
      console.log('end~')
    })
  }
}

const l = new Lesson()
l.tap()
l.start()