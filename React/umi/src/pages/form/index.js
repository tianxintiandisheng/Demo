import { Tabs, Typography, Card } from 'antd';
import { StickyContainer, Sticky } from 'react-sticky';
import RegistrationForm from './components/RegistrationForm';
import TreeSelectForm from './components/TreeSelectForm';
import AntdSelect from './components/AntdSelect';
import MySelect from './components/MySelect';
import SelectUserDefine from './components/SelectUserDefine';
import dropdownStyle from './assets/select/dropdownStyle.png';
import dropdownMenuStyle from './assets/select/dropdownMenuStyle.png';

const { TabPane } = Tabs;
const { Title } = Typography;
const { Meta } = Card;

const renderTabBar = (props, DefaultTabBar) => {
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
      <Tabs defaultActiveKey="3" renderTabBar={renderTabBar}>
        <TabPane tab="官方注册表单示例" key="1">
          <RegistrationForm />
        </TabPane>
        <TabPane tab="树状选择器" key="2" >
          <TreeSelectForm />
        </TabPane>
        <TabPane tab="自定义选择器样式" key="3">
          <Title level={3}>antd原生select</Title>
          <AntdSelect />
          <Title level={3}>直接修改css</Title>
          <MySelect />
          <Title level={3}>依据官方Api修改</Title>
          <Title level={4}>依据官方Api修改</Title>
          <SelectUserDefine />
          <Title level={4}>dropdownStyle属性设置类名为dropdown的元素样式</Title>
          <img src={dropdownStyle} alt="example" />
          <img src={dropdownMenuStyle} alt="example" />

        </TabPane>
      </Tabs>
    </StickyContainer>
  );
};
