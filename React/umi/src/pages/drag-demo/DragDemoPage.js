import React from "react";
import { Typography, Tabs } from 'antd';

import Nest from "./components/Nest";
// import ResourceAdd from "./components/ResourceAdd";
import BasicsDrag from "./components/BasicsDrag";
import Vote from "./components/Vote";
import VoteByDnd from "./components/VoteByDnd";
import ReactBeautifulDnd from "./components/ReactBeautifulDnd";
import BeautifulCodeOfDrag from "./components/BeautifulCodeOfDrag";

import styles from "./DragDemoPage.less";
const { Title } = Typography;
// 将 HTMLBackend 作为参数传给 DragDropContext
const { TabPane } = Tabs;

class DragDemoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{
        index: 1,
        bgColor: "red"
      }, {
        index: 2,
        bgColor: "green"
      }, {
        index: 3,
        bgColor: "blue"
      }, {
        index: 4,
        bgColor: "yellow"
      }, {
        index: 5,
        bgColor: "orange"
      }, {
        index: 6,
        bgColor: "grey"
      }, {
        index: 7,
        bgColor: "blueviolet"
      }, {
        index: 8,
        bgColor: "bisque"
      }, {
        index: 9,
        bgColor: "cyan"
      }]
    }
  }
  render() {
    return (
      <div className={styles.root}>
        <Tabs defaultActiveKey="3" >
          <TabPane tab="拖拽生成动态表单" key="1">
            <Title>资源编辑</Title>
            <BeautifulCodeOfDrag />
          </TabPane>
          <TabPane tab="dnd组件库拖拽示例" key="2">
            <Title>基础拖拽</Title>
            <BasicsDrag></BasicsDrag>
            <Title>基础拖拽样式优化</Title>
            <ReactBeautifulDnd></ReactBeautifulDnd>
            <Title>嵌套拖拽示例</Title>
            <Nest></Nest>
          </TabPane>
          <TabPane tab="基于h5拖拽" key="3">
            <Title>基于h5的的拖拽，只能用于pc端</Title>
            <Vote data={this.state.data} />
          </TabPane>
          <TabPane tab="拖拽投票" key="4">
            <Title>拖拽投票</Title>
            <VoteByDnd />
          </TabPane>
        </Tabs>





      </div>
    );
  }

};

export default DragDemoPage;


