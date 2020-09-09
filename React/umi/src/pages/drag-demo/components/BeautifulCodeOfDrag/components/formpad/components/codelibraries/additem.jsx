import React, { Component } from "react";
import { connect } from "dva";
import { Button, Form, Input } from "antd";

@connect(({ codeLibrariesModel }) => ({ codeLibrariesModel }))
class AddItemForm extends Component {
  state = {};

  handleSubmit = e => {
    e.preventDefault();
    const { form, getData } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        dispatch({
          type: "codeLibrariesModel/secCodeMgtAdd",
          payload: {
            type: 2,
            ...values,
          },
        }).then(res => {
          if (res) {
            getData();
          }
          dispatch({
            type: "codeLibrariesModel/getAllCodeMgtList",
          });
        });
      }
    });
  };

  render() {
    const { form } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div style={{ border: "1px solid #888888" }}>
        <div style={{ fontWeight: "bold" }}>新增编码</div>
        <div style={{ padding: "16px 0" }}>
          <Form layout="inline" onSubmit={this.handleSubmit}>
            <Form.Item label="参数编码">
              {getFieldDecorator("code", {
                rules: [
                  {
                    required: true,
                    message: "请输入",
                  },
                  {
                    pattern: /^[a-z|A-Z|0-9|_]+$/,
                    message: "不合法的字符",
                  },
                ],
              })(<Input placeholder="请输入" />)}
            </Form.Item>
            <Form.Item label="编码说明">
              {getFieldDecorator("remark", {
                // rules: [{ required: true, message: 'Please input your username!' }],
              })(<Input placeholder="请输入" />)}
            </Form.Item>
            <Form.Item>
              <Button onClick={this.handleSubmit}>新增编码</Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const AddItem = Form.create({ name: "AddItemForm" })(AddItemForm);
export default AddItem;
