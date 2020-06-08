import React from "react";
import {
  Form,
  Input,
  TreeSelect,
  Button,
  DatePicker,
  Radio,
} from 'antd';
import { orgTreeTop } from './constant';
import WrappedDemo from "../WrappedDemo";
import CheckAndRadio from "../CheckAndRadio";

// const { Option } = Select;
const { TreeNode } = TreeSelect;
const { TextArea } = Input;


class CreatMeeting extends React.Component {
  state = {

  };

  handleSubmit = e => {
    e.preventDefault();
    const { form } = this.props
    form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      // 时间类组件的 value 类型为 moment 对象，所以在提交服务器前需要预处理
      const values = {
        ...fieldsValue,
        'date-picker': fieldsValue['date-picker'].format('YYYY-MM-DD'),
      };
      window.console.log('Received values of form: ', values);
    });
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
    const { form: { getFieldDecorator } } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 20,
          offset: 4,
        },
      },
    };
    const rulesDefault = [
      {
        required: true,
        message: '此项为必填项!',
      },
    ];

    const rulesDate = [
      {
        type: 'object',
        required: true,
        message: '此项为必填项!',
      },
    ];




    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label="会议主题">
          {getFieldDecorator('title', {
            rules: rulesDefault,
          })(<Input placeholder="填写会议名称" />)}
        </Form.Item>
        <Form.Item label="会议日期">
          {getFieldDecorator('date-picker', {
            rules: rulesDate,
          }
          )(<DatePicker />)}
        </Form.Item>
        <Form.Item label="会议地点">
          {getFieldDecorator('site', {
            rules: rulesDefault,
          })(<Input placeholder="填写会议地点" />)}
        </Form.Item>
        <Form.Item label="邀请参与人">
          {getFieldDecorator("dutyPoliceVOList", {
            rules: rulesDefault,
          })(
            <TreeSelect
              showSearch
              style={{ width: '100%' }}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              placeholder="选择参会人员"
              allowClear
              multiple
              treeCheckable
              treeDefaultExpandAll={false}
            >
              {this.renderTreeNode(orgTreeTop, true, true)}
            </TreeSelect>
          )}
        </Form.Item>
        <Form.Item label="会议通知">
          {getFieldDecorator('expain', {
            rules: rulesDefault,
          })(<TextArea placeholder="填写会议通知，限制字数1000字" autoSize={{ minRows: 5, maxRows: 10 }} />)}
        </Form.Item>
        <Form.Item label="是否参会">
          {getFieldDecorator('option', {
            rules: rulesDefault,
          })(
            <Radio.Group>
              <Radio value={1}>参加</Radio>
              <Radio value={2}>不参加</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        {/* <Form.Item label="自定义控件">
          {getFieldDecorator('option', {
            rules: rulesDefault,
          })(<WrappedDemo />)}
        </Form.Item> */}
        <Form.Item label="官方自定义控件demo">
          {getFieldDecorator('price', {
            initialValue: { number: 1, currency: 'rmb1' },
            // rules: [{ validator: this.checkPrice }],
          })(<WrappedDemo />)}
        </Form.Item>

        <Form.Item label="自定义控件demo">
          {getFieldDecorator('meetingItem', {
            initialValue: { labelText: '是否自爆', radioValue: 1 },
          })(<CheckAndRadio />)}
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: 10 }}
          >
            发送会议通知
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: 'green' }}
          >
            保存至草稿箱
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const CreatMeetingForm = Form.create({ name: 'creat' })(CreatMeeting);
export default CreatMeetingForm;