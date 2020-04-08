import React, { Component } from 'react';
import {
  Form,
  Button,
  Input,
  TreeSelect,
} from 'antd';

import TreeSelectItem from '../TreeSelectItem';

import { orgTree, orgTreeTop } from '../TreeSelectItem/constant';


const { TreeNode } = TreeSelect;
const rules = [
  {
    required: true,
    message: "输入不能为空",
  },
];

class TreeSelectForm extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };


  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
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
      // console.count('item.children', itemArray.children);
      // console.log('(item.children的item', itemArray)
      // console.log('(item.children', itemArray.children)
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
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="应用名称">
          {getFieldDecorator("nameDictCode", { rules })(
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
          )}
        </Form.Item>
        <Form.Item label="应用版权所属">
          {getFieldDecorator("orgDictCode", { rules })(
            <TreeSelectItem />
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            申请
          </Button>
        </Form.Item>
      </Form>
    )
  }

}

const TreeSelectFormDemo = Form.create({ name: 'register' })(TreeSelectForm);
export default TreeSelectFormDemo;