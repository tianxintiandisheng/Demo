import React, { Component } from 'react';
import {
  Form,
  Button,
  // Input,
  TreeSelect,
} from 'antd';


import { orgTree, orgTreeTop } from './constant';


const { TreeNode } = TreeSelect;
const validateLimit = (rule, value, callback) => {
  console.log('value', value)
  if (value.length > 2) {
    callback('最多选择5个选项！');
  } else {
    callback();
  }
}

const getArraylength = (value) => {
  console.log('value', value)
  let lengthNumber = 0;
  if (value) {

    lengthNumber = value.length;
  }
  return lengthNumber
}


const rules = [
  {
    required: true,
    message: "输入不能为空",
  },



];

// const rulesLimit = [
//   {
//     required: true,
//     message: "输入不能为空",
//   },
//   {
//     validator: (rule, value, callback) => validateLimit(rule, value, callback),
//     message: "输入不能为空111",
//   },
// ];

class TreeSelectForm extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (values.onekeyAuditPersonList && values.onekeyAuditPersonList.length > 0) {
        const onekeyAuditPersonListJson = values.onekeyAuditPersonList.map((item) => {
          const itemJson = JSON.parse(item);
          return itemJson
        });
        values.onekeyAuditPersonList = onekeyAuditPersonListJson;
      }
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
  * @function 渲染树形选择器
  * @param {Array} array 
  * @param {boolean} stateIsUser  用于判断是否要渲染至民警/领导
  * @param {boolean} stateIsPolice  用于判断是民警还是领导
  * @returns reactElement 
  * @author tds 2020-4-9
  * */
  renderTreeNode = (array, stateIsUser, stateIsPolice) => {
    // console.log(stateIsUser, stateIsPolice)
    const reactElementArray = array.map(item => {
      const reactElement = (
        <TreeNode
          key={item.orgCode}
          value={item.orgCode}
          title={item.orgName}
          selectable={false}
          treeNodeFilterProp={item.orgName}
        >
          {stateIsUser ? this.renderTreeNodeChildrenUser(item, stateIsPolice) : this.renderTreeNodeChildrenOrg(item)}
        </TreeNode>

      );
      return reactElement;
    })
    return reactElementArray;

  }

  /**
   * @function 数组的map函数，递归渲染treenode数据
   * @description 渲染至民警/领导
   * @param {Array} itemArray  数组的项
   * @param {boolean} stateIsPolice  用于判断是民警还是领导
   * @returns reactElement 
   * @author tds 2020-4-9
   * */
  renderTreeNodeChildrenUser = (itemArray, stateIsPolice) => {
    let reactElementChildrenArray = null;

    if (itemArray.users && itemArray.users.length > 0 && stateIsPolice) {
      // 民警选项
      reactElementChildrenArray = itemArray.users.map(item => {
        const reactElementChildren = (
          <TreeNode
            key={item.uuid}
            value={item.username}
            title={item.displayName}
            treeNodeFilterProp={item.displayName}
          />
        )
        return reactElementChildren;
      })
    } else if (itemArray.users && itemArray.users.length > 0 && !stateIsPolice) {
      // 领导选项 
      reactElementChildrenArray = itemArray.users.map(item => {
        const valueAuditPerson = {
          userId: item.uuid,
          userName: item.username,
          displayName: item.displayName,
        }
        const reactElementChildren = (
          <TreeNode
            key={item.uuid}
            value={JSON.stringify(valueAuditPerson)}
            title={item.displayName}
            treeNodeFilterProp={item.displayName}
          />
        )
        return reactElementChildren;
      })

    } else if (itemArray.childs && itemArray.childs.length > 0) {
      reactElementChildrenArray = itemArray.childs.map(item => {
        const reactElementChildren = (
          <TreeNode
            key={item.orgCode}
            value={item.orgCode}
            title={item.orgName}
            selectable={false}
            treeNodeFilterProp={item.orgName}
          >
            {this.renderTreeNodeChildrenUser(item, stateIsPolice)}
          </TreeNode>
        )
        return reactElementChildren;
      });
    } else {
      return reactElementChildrenArray;
    }
    return reactElementChildrenArray;
  }

  /**
 * @function 数组的map函数，递归渲染treenode数据
 * @description 渲染至组织
 * @param {Array} itemArray  数组的项
 * @returns reactElement 
 * @author tds 2020-4-9
 * */
  renderTreeNodeChildrenOrg = (itemArray) => {
    let reactElementChildrenArray = null;

    if (itemArray.childs && itemArray.childs.length > 0) {
      reactElementChildrenArray = itemArray.childs.map(item => {
        const reactElementChildren = (
          <TreeNode
            key={item.orgCode}
            value={item.orgCode}
            title={item.orgName}
            treeNodeFilterProp={item.orgName}
          >
            {this.renderTreeNodeChildrenOrg(item)}
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
        <Form.Item label="应用版权所属">
          {getFieldDecorator("orgDictCode", { rules })(
            <TreeSelect
              showSearch
              style={{ width: '100%' }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="单选"
              allowClear
              treeDefaultExpandAll={false}
            >
              {this.renderTreeNode(orgTreeTop)}
            </TreeSelect>
          )}
        </Form.Item>
        <Form.Item label="应用适用组织">
          {getFieldDecorator("useOrgs", { rules })(
            <TreeSelect
              showSearch
              style={{ width: '100%' }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="多选"
              maxTagCount={2}
              allowClear
              multiple
              treeDefaultExpandAll={false}
            >
              {this.renderTreeNode(orgTreeTop)}
            </TreeSelect>
          )}
        </Form.Item>
        <Form.Item label="审批领导">
          {getFieldDecorator("onekeyAuditPersonList", {
            rules: [
              {
                required: true,
                message: "输入不能为空",
              },
              {
                validator: (rule, value, callback) => validateLimit(rule, value, callback),
                message: "最多选择2个选项！",
              },
            ]
          })(
            <TreeSelect
              showSearch
              style={{ width: '100%' }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="多选"
              maxTagCount={2}
              allowClear
              multiple
              treeDefaultExpandAll={false}
            >
              {this.renderTreeNode(orgTreeTop, true)}
            </TreeSelect>
          )}
        </Form.Item>
        <Form.Item label="负责民警">
          {getFieldDecorator("dutyPoliceVOList", {
            rules: [
              {
                required: true,
                message: "输入不能为空",
              },
              {
                validator: (rule, value, callback) => validateLimit(rule, value, callback),
                message: "最多选择2个选项！",
              },
            ]
          })(
            <TreeSelect
              showSearch
              style={{ width: '100%' }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="多选"
              allowClear
              multiple
              treeDefaultExpandAll={false}
            >
              {this.renderTreeNode(orgTreeTop, true, true)}
            </TreeSelect>
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