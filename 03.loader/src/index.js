console.log('hello fang')

class Person {
  components(name){
    this.name = name
  }
  setName(name){
    this.name = name
  }
}

console.log(new Person('fang'))