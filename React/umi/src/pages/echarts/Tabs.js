import React, { Component } from 'react';
import { Tabs } from 'antd';
import { StickyContainer, Sticky } from 'react-sticky';
import { Progress } from 'antd';
import { TreeSelect } from 'antd';
import { orgTree, orgTreeTop } from './constant';
// import Item from 'antd/lib/list/Item';

const { TreeNode } = TreeSelect;


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



class TabsDemo extends Component {
  state = {
    value: undefined,
    valueRadio: undefined,
  };
  onChange = value => {
    // console.log(value);
    this.setState({ value });
  };

  onChangeRadio = value => {
    // console.log(value);
    this.setState({ valueRadio: value });
  };

  /**
   * @function 渲染treenode数据
   * @param {Array} array 
   * @returns reactElement 
   * */
  renderTreeNode = (array) => {
    const reactElementArray = array.map(item => {
      const reactElement = (
        <TreeNode
          key={item.orgId}
          value={item.orgId}
          title={item.orgName}
          selectable={false}
          treeNodeFilterProp={item.orgName}
        >
          {this.renderTreeNodeChildren(item)}
        </TreeNode>

      );
      return reactElement;
    })
    return reactElementArray;

  }

  /**
   * @function 数组的map函数，递归渲染treenode数据
   * @param {Array} itemArray  数组的项
   * @param {Array} children  reactElement
   * @returns reactElement 
   * */
  renderTreeNodeChildren = (itemArray) => {

    let reactElementChildrenArray = null;
    if (itemArray.children && itemArray.children[0].displayName) {
      console.log('itemArray.length > 0 ', itemArray)
      // console.log('item.children && item.children.displayName', itemArray.displayName)
      reactElementChildrenArray = itemArray.children.map(item => {
        const reactElementChildren = (
          <TreeNode
            key={item.uuid}
            value={item.uuid}
            title={item.displayName}
            treeNodeFilterProp={item.orgName}
          />
        )
        return reactElementChildren;
      })
    } else if (itemArray.children) {
      console.count('item.children', itemArray.children);
      console.log('(item.children的item', itemArray)
      console.log('(item.children', itemArray.children)
      reactElementChildrenArray = itemArray.children.map(item => {
        const reactElementChildren = (
          <TreeNode
            key={item.orgId}
            value={item.orgId}
            title={item.orgName}
            selectable={false}
            treeNodeFilterProp={item.orgName}
          >
            {this.renderTreeNodeChildren(item)}
          </TreeNode>
        )
        return reactElementChildren;
      });
    } else {
      // console.log('item.children1111', item.children)
      // console.log('item.children1111', item)
      return reactElementChildrenArray;
    }
    return reactElementChildrenArray;
  }

  render() {
    return (
      <StickyContainer>
        <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
          <TabPane tab="Tab 1" key="1" style={{ height: 200 }}>
            {/* <TreeSelect
              showSearch
              style={{ width: '100%' }}
              value={this.state.value}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="多选"
              allowClear
              multiple
              treeDefaultExpandAll={false}
              onChange={this.onChange}
            >
              {orgTree.map(item => {
                const reactElement = (
                  <TreeNode
                    key={item.orgId}
                    value={item.orgId}
                    title={item.orgName}
                    selectable={false}
                    treeNodeFilterProp={item.orgName}
                  >
                    {item.children.map(item => {
                      const reactElement = (
                        <TreeNode
                          key={item.uuid}
                          value={item.uuid}
                          title={item.displayName}
                          treeNodeFilterProp={item.orgName}
                        />
                      )
                      return reactElement;
                    })}
                  </TreeNode>
                );
                return reactElement;
              })}
            </TreeSelect> */}


          </TabPane>
          <TabPane tab="Tab 2" key="2">
            <Progress
              type="circle"
              strokeColor={{
                '0%': '#ef3f1d',
                '100%': '#f5c502',
              }}
              percent={25}
            />
            <Progress
              type="circle"
              strokeColor={{
                '0%': '#ef3f1d',
                '100%': '#f5c502',
              }}
              percent={50}
            />

            <Progress
              type="circle"
              strokeColor={{
                '0%': '#ef3f1d',
                '100%': '#f5c502',
              }}
              percent={75}
            />

            <Progress
              type="circle"
              strokeColor={{
                '0%': '#ef3f1d',
                '100%': '#f5c502',
              }}
              percent={100}
            />
          </TabPane>
          <TabPane tab="Tab 3" key="3">
            <TreeSelect
              showSearch
              style={{ width: '100%' }}
              value={this.state.value}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="多选"
              allowClear
              multiple
              treeDefaultExpandAll={false}
              onChange={this.onChange}
            >
              {this.renderTreeNode(orgTreeTop)}
            </TreeSelect>
          </TabPane>
        </Tabs>
      </StickyContainer>
    );
  }
}

export default TabsDemo;


