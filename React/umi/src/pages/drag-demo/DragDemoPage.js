import React from "react";
import { Typography } from 'antd';

import Nest from "./components/Nest";
import ResourceAdd from "./components/ResourceAdd";
import BasicsDrag from "./components/BasicsDrag";
import Vote from "./components/Vote";
import VoteByDnd from "./components/VoteByDnd";
import ReactBeautifulDnd from "./components/ReactBeautifulDnd";


import styles from "./DragDemoPage.less";
const { Title } = Typography;
// 将 HTMLBackend 作为参数传给 DragDropContext





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
        {/* This is DragDemo */}
        {/* <Vote /> */}
        {/* <Title>资源编辑demo</Title>
        <ResourceAdd></ResourceAdd> */}

        {/* <Title>基础拖拽</Title>
        <BasicsDrag></BasicsDrag>
        <Title>基础拖拽样式优化</Title>
        <ReactBeautifulDnd></ReactBeautifulDnd>
        <Title>嵌套拖拽示例</Title>
        <Nest></Nest>
        <Title>基于h5的的拖拽，只能用于pc端</Title>
        <Vote data={this.state.data} /> */}

        <VoteByDnd />
      </div>
    );
  }

};

export default DragDemoPage;


