import React, { Component } from "react";
import { connect } from "dva";
import {
  Card,
  Form,
  Input,
  InputNumber,
  Select,
  Row,
  Col,
  Button,
  Radio,
  Checkbox,
} from "antd";
import CodeLibraries from "../../../formpad/components/codelibraries";
import styles from "./index.less";

const { Item } = Form;
const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 15 },
};
const blockItemLayout = {
  wrapperCol: {
    span: 24,
    offset: 0,
  },
};
const panelItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 },
};
@Form.create()
// @connect(({ codeLibrariesModel }) => ({ allCodeMgtList: codeLibrariesModel.allCodeMgtList }))
class NumberInput extends Component {
  state = {
    CodeLibrariesVisible: false,
    selecter: [],
    // selectValue: [],
    unitDisabled: false,
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

    const { setModelCode } = this.props;
    setModelCode(option);
  }


  render() {
    const {
      onCheckboxChange,
      onModelNameChange, allCodeMgtList,
      onRemarkChange, sourceItem, onNumberTypeChange,
      onDefaultValueChange, onMaxValChange, onMinValChange, onUnitChange,
    } = this.props;
    const { CodeLibrariesVisible, unitDisabled } = this.state;
    const checkValue = [];
    if (sourceItem.isMust) {
      checkValue.push(1);
    }
    if (sourceItem.isAdd) {
      checkValue.push(4)
    }
    return (
      <Card className={styles.root} title="模板名称：数值输入">
        <Form {...formItemLayout}>
          <Item
            extra="(选择“可重复添加”后，界面上会有“添加 ‘规格参数’” 按钮)"
            {...blockItemLayout}
          >
            <Checkbox.Group value={checkValue} style={{ width: '100%' }} onChange={onCheckboxChange}>
              <Checkbox value={1}>必填项</Checkbox>
              <Checkbox value={4}>可重复添加</Checkbox>
            </Checkbox.Group>
          </Item>
          <Item label="规格参数名称" required>
            <Input value={sourceItem.modelName} placeholder="请输入规格参数名称" onChange={onModelNameChange} />
          </Item>

          <Item label="规格参数取值" {...blockItemLayout} required>
            <Card className={styles.inner}>
              <Item label="类型名称" {...panelItemLayout}>
                <Radio.Group defaultValue={1} onChange={onNumberTypeChange}>
                  <Radio value={1}>整型</Radio>
                  <Radio value={2}>浮点型</Radio>
                </Radio.Group>
              </Item>
              <Item label="默认值" {...panelItemLayout}>
                <InputNumber placeholder="默认值" onChange={onDefaultValueChange} />
              </Item>
              <Item label="最大值" {...panelItemLayout}>
                <InputNumber placeholder="最大值" onChange={onMaxValChange} />
              </Item>
              <Item label="最小值" {...panelItemLayout}>
                <InputNumber placeholder="最小值" onChange={onMinValChange} />
              </Item>
            </Card>
          </Item>
          <Item label="规格参数单位" {...blockItemLayout} required>
            <Card className={styles.inner}>
              <Item label="参数单位" {...panelItemLayout}>
                <Radio.Group
                  defaultValue={2}
                  onChange={(e) => {
                    const { value } = e.target;
                    this.setState({
                      unitDisabled: value === 1,
                    })
                  }}
                >
                  <Radio value={1}>无</Radio>
                  <Radio value={2}>有</Radio>
                </Radio.Group>
              </Item>
              <Item
                colon={false}
                label={
                  <div>
                    <div>容量：</div>
                    <div>其他：</div>
                  </div>
                }
                {...panelItemLayout}
              >
                <Radio.Group
                  defaultValue="GB"
                  onChange={(e) => {
                    onUnitChange(e, unitDisabled)
                  }}
                  disabled={unitDisabled}
                >
                  <Radio value="GB">GB</Radio>
                  <Radio value="TB">TB</Radio>
                  <Radio value="PB">PB</Radio>
                  <div>
                    <Radio value="times">次</Radio>
                    <Radio value="unit">个</Radio>
                  </div>
                </Radio.Group>
              </Item>
            </Card>
          </Item>
          <Item label="规格参数说明">
            <Input.TextArea value={sourceItem.remark} placeholder="请输入规格参数说明" rows={4} onChange={onRemarkChange} />
          </Item>
        </Form>
      </Card>
    );
  }
}
export default NumberInput;
