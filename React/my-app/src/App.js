import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import About from './components/About/About';

//这个站点有3个页面，所有的页面都被渲染了
//在浏览器中动态(不是服务器渲染)。
//尽管页面从未刷新，但请注意刷新的方式当你导航时，React Router会保持URL的更新
//通过网站。这保存了浏览器的历史，
//确保返回按钮和书签之类的东西正常工作。




export default class BasicExample extends Component {
  onRef = (wwwww) => {
    console.log(this)
    console.log(wwwww)
    this.child = wwwww
  }

  click = () => {
    this.child.myName()
  }
  render() {
    return (
      <Router>
        <button onClick={this.click} >click</button>
        <div id="mountNode"></div>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/dashboard">chart</Link>
            </li>
            <li>
              <Link to="/child">ref的使用 </Link>
            </li>

          </ul>

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
            <Route path="/about">
              <About />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
            <Route path="/child">
              <Child onRef={this.onRef} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
// You can think of these components as "pages"
// in your app.


class Child extends Component {
  componentDidMount() {
    this.props.onRef(this)
  }

  myName = () => alert('田迪生')

  render() {
    return (
      <div>
        <h2>我是子组件</h2>
      </div>
    )
  }

}

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

// function About() {
//   return (
//     <div>
//       <h2>About</h2>
//     </div>
//   );
// }

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

