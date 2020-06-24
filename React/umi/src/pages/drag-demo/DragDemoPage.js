import React from "react";
import { Typography } from 'antd';
import Nest from "./components/Nest";
import ResourceAdd from "./components/ResourceAdd";
import BasicsDrag from "./components/BasicsDrag";
import ReactBeautifulDnd from "./components/ReactBeautifulDnd";
import styles from "./DragDemoPage.less";

const { Title } = Typography;


class DragDemoPage extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        {/* This is DragDemo */}
        <Title>资源编辑demo</Title>
        <ResourceAdd></ResourceAdd>
        {/* <Title>基础拖拽</Title>
        <BasicsDrag></BasicsDrag>
        <Title>基础拖拽样式优化</Title>
        <ReactBeautifulDnd></ReactBeautifulDnd> */}
        <Title>嵌套拖拽示例</Title>
        <Nest></Nest>

      </div>
    );
  }
};

export default DragDemoPage;
