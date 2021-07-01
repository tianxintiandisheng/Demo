import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from './components/Home'; // 引入主页组件
import Child from './components/Child'; // 引入子组件
// import ChartDemo from './components/ChartDemo'; // 引入图表示例组件
import Game from './components/Game'; // 引入井字棋游戏组件
import HooksDemo from './components/HooksDemo/HooksDemo';
import Smzq from './components/Smzq';

//这个站点有多个页面，所有的页面都被渲染了
//在浏览器中动态(不是服务器渲染)。
//尽管页面从未刷新，但请注意刷新的方式当你导航时，React Router会保持URL的更新
//通过网站。这保存了浏览器的历史，
//确保返回按钮和书签之类的东西正常工作。




export default class BasicExample extends Component {
  getChildComponent = (childComponent) => {
    // console.log(this);
    // console.log(childComponent);
    this.child = childComponent;
  }

  click = () => {
    // console.log('this.props', this.props);
    if (this.child) {
      this.child.myName();
    } else {
      alert('父组件调用子组件方法,在子组件加载后才可以使用')
    }

  }
  render() {
    return (
      <Router>

        <h3>路由跳转</h3>
        <div id="mountNode"></div>

        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {/* <li>
              <Link to="/ChartDemo">bizcharts使用示例</Link>
            </li> */}
            <li>
              <Link to="/Game">井字棋游戏</Link>
            </li>
            <li>
              <Link to="/child">加载子组件 </Link>
            </li>
            <li>
              <Link to="/HooksDemo">HooksDemo</Link>
            </li>
            <li>
              <Link to="/Smzq">react生命周期</Link>
            </li>
          </ul>
          <h3>父组件调用子组件方法,在子组件加载后才可以使用</h3>
          <button onClick={this.click} >sayMyName</button>

          <hr />

          {/*
          一个<Switch>遍历它所有的子节点<Route>
          元素并呈现其路径的第一个元素
          匹配当前URL。随时使用<Switch>
          你有多条路径，但你只想要一条
          他们的渲染一次通过网站。这保存了浏览器的历史，
          确保返回按钮和书签之类的东西
          正常工作。
          */}
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            {/* <Route path="/ChartDemo">
              <ChartDemo />
            </Route> */}
            <Route path="/Game">
              <Game />
            </Route>
            <Route path="/child">
              <Child getChildComponent={this.getChildComponent} />
            </Route>
            <Route path="/HooksDemo">
              <HooksDemo />
            </Route>
            <Route path="/Smzq">
              <Smzq testData="props测试数据" />
            </Route>

          </Switch>
        </div>

      </Router>
    );
  }
}





