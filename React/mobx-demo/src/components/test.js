import { observable, action, computed } from 'mobx';

class TestStore {
  /*
  * @observable
  * 被观察者
  */
  @observable name;
  @observable list;
  /*
  * @computed
  * 可以根据现有的状态或其它计算值衍生出的值
  * 对数据进行进一步处理，有助于使实际修改的状态尽可能的小
  */
  @computed
  get getListlength () {
    return this.list.length;
  }
  /*
  * @action
  * 定义action(动作)
  */
  @action
  changeName = name => {
    this.name = name
  }
  filterList = () => {
    this.list = this.list.filter(v => v.id === 1)
  }
  /*
  * 构造函数
  * 定义state
  */
  constructor() {
    this.name = '天心天地生'
    this.list = [
      {
        name: '香蕉',
        id: 0
      },
      {
        name: '苹果',
        id: 1
      },
      {
        name: '西瓜',
        id: 2
      }
    ]
  }
}
const test = new TestStore()
export default test