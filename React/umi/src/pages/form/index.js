import { Tabs } from 'antd';
import { StickyContainer, Sticky } from 'react-sticky';
import RegistrationForm from './components/RegistrationForm';
import TreeSelectForm from './components/TreeSelectForm';
import MySelect from './components/MySelect';

const { TabPane } = Tabs;

const renderTabBar = (props, DefaultTabBar) => {
  // console.log('props', props); // todo
  // console.log('DefaultTabBar', DefaultTabBar); // todo
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

export default () => {
  return (
    <StickyContainer>
      <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
        <TabPane tab="Tab 1" key="1" >
          <TreeSelectForm />
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          <RegistrationForm />
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          <MySelect />
        </TabPane>
      </Tabs>
    </StickyContainer>
  );
};
