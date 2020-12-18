
import React, { useState } from 'react';

// import styles from "./HooksDemo.less";


function HooksDemo() {
  /**
   * 从下面这行代码可以看出的
   * 1. useState是一个函数,可以接受一个参数;
   * 2. useState的返回值是一个数组
   * */
  const [count, setCount] = useState(0);  // 声明一个叫 "count" 的 state 变量,和一个叫做setCount的函数

  const arrayUseState = useState(0);
  console.log('useState', arrayUseState)
  console.log('useState', useState)
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default HooksDemo;
