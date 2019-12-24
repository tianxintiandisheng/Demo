import React from 'react'
import ReactDOM from 'react-dom'
import { observer, inject } from 'mobx-react';


/*
* inject 在模块内用 @inject('Store')，将 Store 注入到 props 上,保证结构的一致性
* 使用 @observer ，将组件变为观察者，响应 name 状态变化。
* 当状态变化时，组件也会做相应的更新。
*/
@inject('test')
// 观察者
@observer
class DemoComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  handleClick = () => {
    console.log(this.props.test);// 看看这test究竟什么样子
    this.props.test.changeName('改变');
    const listComputed = this.props.test.getListlength;
    console.log(listComputed);
  }
  handleArryFilter = () => {
    this.props.test.filterList();
  }
  render () {
    const { test } = this.props;
    return (
      <div>
        <p>{test.name}</p>
        <p>{test.list[0].name}</p>
        <p>数组长度（使用computed属性计算）：{this.props.test.getListlength}</p>
        <button onClick={this.handleClick} style={{ marginRight: "1em" }}>使用改名卡</button>
        <button onClick={this.handleArryFilter}>过滤数组</button>
      </div>
    );
  }
}

export default DemoComponent;
