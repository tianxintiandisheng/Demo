import React, { Component } from 'react';

class Child extends Component {
  componentDidMount() {
    this.props.getChildComponent(this);
  }

  myName = () => alert('我是子组件')

  render() {
    return (
      <div>
        <h2>我是子组件</h2>
      </div>
    )
  }
}

export default Child;