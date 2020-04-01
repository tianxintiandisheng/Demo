import React, { Component } from 'react';

class Child extends Component {
  componentDidMount() {
    this.props.getChildComponent(this);
  }

  myName = () => alert('天心天地生')

  render() {
    return (
      <div>
        <h2>我是子组件</h2>
      </div>
    )
  }
}

export default Child;