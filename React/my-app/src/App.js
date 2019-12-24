import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//这个站点有3个页面，所有的页面都被渲染了
//在浏览器中动态(不是服务器渲染)。
//尽管页面从未刷新，但请注意刷新的方式当你导航时，React Router会保持URL的更新
//通过网站。这保存了浏览器的历史，
//确保返回按钮和书签之类的东西正常工作。
import DemoComponent from "./components/mobx/DemoComponent"

export default function BasicExample () {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link> {/*  */}
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/demoComponent">mobx的demonpm run eject </Link>
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
          <Route path="/demoComponent">
            <DemoComponent />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.

function Home () {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About () {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard () {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}
