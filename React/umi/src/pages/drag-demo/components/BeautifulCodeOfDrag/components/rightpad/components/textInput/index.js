import React, { Component } from "react";
import { connect } from "dva";
import { Form, Input, Select, Row, Col, Button, Checkbox } from "antd";
import CodeLibraries from "../../../formpad/components/codelibraries";
// import styles from "./index.less";

const { Item } = Form;
const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailFormItemLayout = {
  wrapperCol: {
    span: 24,
    offset: 0,
  },
};

@Form.create()
// @connect(({ codeLibrariesModel }) => ({ allCodeMgtList: codeLibrariesModel.allCodeMgtList }))
class TextInput extends Component {
  state = {
    CodeLibrariesVisible: false,
    selecter: [],
    selectValue: [],
  };

  componentDidMount() { }

  handleOk = (data) => {
    if (!data) {
      this.setState({
        CodeLibrariesVisible: false,
      })
      return
    }
    // const { getCodeData}=this.props
    const { selecter } = this.state
    // if (codeSelecter!==[]) {
    // console.log(codeSelecter)
    let flag = false
    selecter.forEach((item, index) => {
      // console.log(item.codeId)
      // console.log(data.codeId)
      if (item.codeId === data.codeId) {
        // console.log('chufale')
        data.name = data.codeName
        data.typeName = data.codeName
        selecter.splice(index, 1, data)
        flag = true
      }
    })
    // }
    if (!flag) {
      data.name = data.codeName ? data.codeName : ''
      data.typeName = data.codeName ? data.codeName : ''
      selecter.push(data)
    }
    // console.log(codeSelecter)

    this.setState({
      CodeLibrariesVisible: false,
      selecter,
    })
    // getCodeData(selecter)
    // const { form } = this.props
    // const codeArr = form.getFieldsValue().code;
    // // console.log(form.getFieldsValue().code)
    // codeArr.push(`${data.name}`)
    // // console.log(codeArr)
    // form.setFieldsValue({
    //   code: codeArr,
    // });
  }

  handleSelectChange = (val, option) => {
    // this.setState({
    //   selectValue: val,
    // })
    const { setModelCode } = this.props
    setModelCode(option);
  }

  render() {
    const {
      onCheckboxChange,
      onModelNameChange, allCodeMgtList, onRemarkChange, sourceItem,
    } = this.props;
    const { CodeLibrariesVisible } = this.state;
    const checkValue = [];
    if (sourceItem.isMust) {
      checkValue.push(1);
    }
    if (sourceItem.isTextarea) {
      checkValue.push(5)
    }
    return (
      <Form {...formItemLayout}>
        <Item
          extra="(默认输入单行文本，文本域为多行输入)"
          {...tailFormItemLayout}
        >
          <Checkbox.Group value={checkValue} style={{ width: '100%' }} onChange={onCheckboxChange}>
            <Checkbox value={1}>必填项</Checkbox>
            <Checkbox value={5}>文本域</Checkbox>
          </Checkbox.Group>
        </Item>
        <Item label="规格参数名称" required>
          <Input value={sourceItem.modelName} placeholder="请输入规格参数名称" onChange={onModelNameChange} />
        </Item>

        <Item label="规格参数说明">
          <Input.TextArea value={sourceItem.remark} placeholder="请输入规格参数说明" rows={4} onChange={onRemarkChange} />
        </Item>
      </Form>
    );
  }
}
export default TextInput;
