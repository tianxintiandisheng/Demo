import React from "react";
import { Tabs, Typography } from 'antd';
import TableChangeDom from './components/TableChangeDom';
import TableChangeCss from './components/TableChangeCss';
import styles from "./TableListPage.less";

const { TabPane } = Tabs;
const { Title } = Typography;

function callback(key) {
  console.log(key);
}

class TableListPage extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        <Tabs defaultActiveKey="1" onChange={callback}>
          <TabPane tab="奇偶行不同样式" key="1">
            <Title>渲染时给奇偶行设置不同类名</Title>
            <TableChangeDom></TableChangeDom>
            <Title>通过CSS选择器为奇偶行设置不同样式</Title>
            <TableChangeCss></TableChangeCss>
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </div>
    );
  }
};

export default TableListPage;
