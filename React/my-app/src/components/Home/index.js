import React from 'react'; // 必须引入react，因为该函数式组件使用了jsx语法

function Home() {
  return (
    <div>
      <h2>项目简介</h2>
      <p>本项目为基于原生 react 的项目，demo涉及的内容如下</p>
      <ul>
        <li>路由跳转</li>
        <li>组件使用，函数式组件和类组件</li>
        <li>bizcharts 图表使用示例</li>
      </ul>
      <h2>组件</h2>
      <p>如果使用了jsx语法，必须引入react</p>
      <h2>React Router</h2>
      <p>
        这个站点有多个页面，所有的页面都被渲染了
        在浏览器中动态(不是服务器渲染)。
        尽管页面从未刷新，但请注意刷新的方式当你导航时，React Router会保持URL的更新
        通过网站。这保存了浏览器的历史，
        确保返回按钮和书签之类的东西正常工作。
      </p>
    </div>
  );
}

export default Home;