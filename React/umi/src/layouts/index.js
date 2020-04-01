// import styles from './index.css';

// function BasicLayout(props) {
//   return (
//     <div className={styles.normal}>
//       <h1 className={styles.title}>Yay! Welcome to umi!</h1>
//       {props.children}
//     </div>
//   );
// }

// export default BasicLayout;

// 修改内容

import styles from './index.css';
import { Layout, Menu, Icon } from 'antd';
import Link from 'umi/link';
const { Header, Content, Footer, Sider } = Layout;

function BasicLayout(props) {
  return (
    <Layout className={styles.antLayout}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          // console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          // console.log(collapsed, type);
        }}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          <Menu.Item key="1">
            <Link to="/">
              <Icon type="user" />
              <span className="nav-text">首页</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="2">
            <Link to="/users">
              <Icon type="video-camera" />
              <span className="nav-text">列表渲染</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="3">
            <Link to="/article">
              <Icon type="upload" />
              <span className="nav-text">Article管理</span>
            </Link>
          </Menu.Item>

          <Menu.Item key="4">
            <Link to="/echarts">
              <Icon type="upload" />
              <span className="nav-text">echarts图表</span>
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>{props.children}</div>
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
      </Layout>
    </Layout>
  );
}

export default BasicLayout;
