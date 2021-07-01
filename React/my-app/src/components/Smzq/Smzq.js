import React, { Component } from 'react'

class Smzq extends Component {
  constructor(props) {
    super(props)
    console.log('constructor-------------构造函数')
    this.state = {
      msg: '我是一个msg数据'
    }
  }

  componentDidMount() {
    console.log('componentDidMount-------------组件挂载')
  }

  //是否要更新数据，如果返回true才会更新数据
  shouldComponentUpdate(nextProps, nextState) {
    console.log('shouldComponentUpdate-------------是否要更新数据')
    console.log('父组件传给子组件的值，这里没有会显示空', nextProps)		//
    console.log('数据更新后的值', nextState)		//
    return true;				//返回true，确认更新
  }
  //将要更新数据的时候触发的
  componentWillUpdate() {
    console.log('componentWillUpdate-------------组件将要更新')
  }
  //更新数据时候触发的生命周期函数
  componentDidUpdate() {
    console.log('componentDidUpdate-------------组件更新完成')
  }
  //更新数据
  setMsg() {
    this.setState({
      msg: '我是改变后的msg数据'
    })
  }
  render() {
    console.log('render-------------数据渲染render')
    return (
      <div>
        <h1> {this.state.msg}</h1>
        <button onClick={() => this.setMsg()}>更新msg的数据</button>
      </div>
    )
  }
}
export default Smzq;