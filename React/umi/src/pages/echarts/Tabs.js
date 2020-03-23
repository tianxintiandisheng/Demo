import React, { Component } from 'react';
import { Tabs } from 'antd';
import { StickyContainer, Sticky } from 'react-sticky';

const { TabPane } = Tabs;

const renderTabBar = (props, DefaultTabBar) => {
  console.log('props', props); // todo
  console.log('DefaultTabBar', DefaultTabBar); // todo
  const reactElement = (
    <Sticky bottomOffset={80}>
      {({ style }) => (
        <DefaultTabBar {...props} className="site-custom-tab-bar" style={{ ...style }} >
        </DefaultTabBar>
      )}
    </Sticky>
  )
  return reactElement;

}



class TabsDemo extends Component {

  render() {
    return (
      <StickyContainer>
        <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
          <TabPane tab="Tab 1" key="1" style={{ height: 200 }}>
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            Content of Tab Pane 2
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            Content of Tab Pane 3
          </TabPane>
        </Tabs>
      </StickyContainer>
    );
  }
}

export default TabsDemo;


