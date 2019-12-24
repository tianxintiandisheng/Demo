import React from 'react';
import logo from './logo.svg';
import './App.css';
import DemoComponent from "./components/DemoComponent"
import test from "./components/test"
import { Provider } from 'mobx-react';// Provider是一个React组件，使用React的上下文（context）机制，可以用来向下传递stores，即把state传递给其子组件。

function App () {
  return (
    <Provider test={test}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header>
        <DemoComponent></DemoComponent>
      </div>
    </Provider>

  );
}

export default App;
