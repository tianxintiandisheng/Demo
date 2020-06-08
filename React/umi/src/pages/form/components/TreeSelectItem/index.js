import React, { Component } from 'react';
import { TreeSelect } from 'antd';
import { orgTreeTop } from '../TreeSelectForm/constant';

const { TreeNode } = TreeSelect;

class TreeSelectItem extends Component {

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
      // console.log('itemArray.length > 0 ', itemArray)
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
      return reactElementChildrenArray;
    }
    return reactElementChildrenArray;
  }

  render() {
    return (
      <TreeSelect
        showSearch
        style={{ width: '100%' }}
        // value={this.state.value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="多选"
        allowClear
        multiple
        treeDefaultExpandAll={false}
      // onChange={this.onChange}
      >
        {this.renderTreeNode(orgTreeTop)}
      </TreeSelect>
    )
  }
}

export default TreeSelectItem;