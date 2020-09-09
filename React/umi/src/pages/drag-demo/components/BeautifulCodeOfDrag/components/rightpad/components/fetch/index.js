import React, { Component } from "react";
import { connect } from "dva";
import { Form, Input, Select, Row, Col, Button, Checkbox } from "antd";
import Zcon from "@cbd/icon";
import CodeLibraries from "../../../formpad/components/codelibraries";
import DataLinkage from "../DataLinkage";
// import styles from "./index.less";

const { Item } = Form;
const { Option } = Select;
// const { TextArea } = Input;

const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
// const tailFormItemLayout = {
//   wrapperCol: {
//     span: 24,
//     offset: 0,
//   },
// };
const blockItemLayout = {
  labelCol: { span: 24 },
  wrapperCol: { span: 24 },
};
const panelItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const checkBoxLayout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};

@Form.create()
// @connect(({ codeLibrariesModel }) => ({ allCodeMgtList: codeLibrariesModel.allCodeMgtList }))
class Fetch extends Component {
  state = {
    CodeLibrariesVisible: false,
    selecter: [],
    // selectValue: [],
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
    const { selecter } = this.state;
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
    // });
    const { setModelCode } = this.props;
    setModelCode(option);
  }

  /**
   * @function 处理复选框的变化事件
   * @param {array} checkValue 复选框选中值组成的数组
   * @param {string} type 操作来源类型;top 顶部复选框;bottom 底部复选框
   * */
  handleCheckboxChange = (type, checkValue) => {
    const { sourceItem, onCheckboxChange } = this.props;
    const checkValueArrayTop = [];
    const checkValueArrayBottom = [];
    if (sourceItem.isMust) {
      checkValueArrayTop.push(1);
    }
    if (sourceItem.isMultySelect) {
      checkValueArrayTop.push(2);
    }
    if (sourceItem.isDataLinkage) {
      checkValueArrayBottom.push(6);
    }
    let checkValueIntact = []; // 完整的复选框值组成的数组
    switch (type) {
      case 'top':

        checkValueIntact = [...checkValue, ...checkValueArrayBottom]
        break;
      case 'bottom':
        checkValueIntact = [...checkValue, ...checkValueArrayTop]
        break;
      default:
        break;
    }
    onCheckboxChange(checkValueIntact);
  }

  /**
   * @function 渲染数据联动组件
   * */
  renderDataLinkage = () => {
    const { sourceItem, sourceIdList, onRuleDataLinkageChange } = this.props;
    let dataLinkageElement = null;
    if (sourceItem.isDataLinkage) {
      dataLinkageElement = (
        <DataLinkage
          sourceItem={sourceItem}
          sourceIdList={sourceIdList}
          onRuleDataLinkageChange={onRuleDataLinkageChange}
        />
      )
    }
    return dataLinkageElement;
  }

  render() {
    const {
      onModelNameChange,
      codeSelecter = [], defaultCheck,
      deleteData, dataInput,
      onRemarkChange, addCard,
      allCodeMgtList, sourceItem,
    } = this.props;
    const {
      CodeLibrariesVisible,
    } = this.state;
    const checkValueArrayTop = [];
    const checkValueArrayBottom = [];
    if (sourceItem.isMust) {
      checkValueArrayTop.push(1);
    }
    if (sourceItem.isMultySelect) {
      checkValueArrayTop.push(2);
    }
    if (sourceItem.isDataLinkage) {
      checkValueArrayBottom.push(6);
    }
    return (
      <Form {...formItemLayout}>
        <Item
          extra="(选择“多选项”后，界面上会有“可多选” 提示)"
          {...blockItemLayout}
        >
          <Checkbox.Group
            style={{ width: '100%' }}
            value={checkValueArrayTop}
            onChange={(e) => this.handleCheckboxChange('top', e)}
          >
            <Checkbox value={1}>必填项</Checkbox>
            <Checkbox value={2}>多填项</Checkbox>
          </Checkbox.Group>
        </Item>
        <Item label="规格参数名称" required>
          <Input value={sourceItem.modelName} placeholder="请输入规格参数名称" onChange={onModelNameChange} />
        </Item>

        <Item label="规格参数值配置:" {...blockItemLayout} required>
          {codeSelecter.map((ele, index) => (
            <div key={ele.id}>
              <Item label="取值" {...panelItemLayout}>
                <Row type="flex" justify="center" align="middle">
                  <Col span={10}>
                    <Input value={ele.name} onChange={dataInput.bind(index, ele.id)} id={`${ele.id}`} />
                  </Col>
                  <Col span={4} style={{ textAlign: "center" }}>
                    <Button icon="delete-o" type="link" onClick={() => deleteData(ele.id, ele.id)} />
                  </Col>
                  <Col span={10}>
                    <Checkbox onChange={defaultCheck.bind(index, ele.id)} id={`${ele.id}`} checked={ele.isCheck || false} />
                    &nbsp;默认勾选
                  </Col>
                </Row>
              </Item>
            </div>
          ))}
          <Item
            wrapperCol={{
              span: 16,
              offset: 8,
            }}
          >
            <Button
              type="dashed"
              style={{ width: "80%" }}
              onClick={() => { addCard("默认值", "默认值"); }}
            >
              <Zcon type="plus" />
              添加规格参数取值
            </Button>
          </Item>

        </Item>
        <Item label="规格参数说明">
          <Input.TextArea value={sourceItem.remark} placeholder="请输入规格参数说明" rows={4} onChange={onRemarkChange} />
        </Item>
        <Item
          {...checkBoxLayout}
          extra="展示的数据会根据其他组件的取值而变化"
        >
          <Checkbox.Group
            value={checkValueArrayBottom}
            onChange={(e) => this.handleCheckboxChange('bottom', e)}
          >
            <Checkbox value={6}>数据联动</Checkbox>

          </Checkbox.Group>
        </Item>
        <Item {...blockItemLayout}>
          {this.renderDataLinkage()}
        </Item>
      </Form>
    );
  }
}
export default Fetch;
