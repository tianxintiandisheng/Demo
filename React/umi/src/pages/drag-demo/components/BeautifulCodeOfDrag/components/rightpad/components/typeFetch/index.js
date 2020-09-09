import React, { Component } from "react";
import { connect } from "dva";
import { Card, Form, Input, Select, Row, Col, Button, Checkbox, Radio } from "antd";
import Zcon from "@cbd/icon";
import CodeLibraries from "../../../formpad/components/codelibraries";
import DataLinkage from "../DataLinkage";

import styles from "./index.less";

const { Item } = Form;
const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 9 },
  wrapperCol: { span: 15 },
};
const blockItemLayout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 24 },
};
const panelItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const buttonLayout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 16, offset: 8 },
};
const checkBoxLayout = {
  labelCol: { span: 0 },
  wrapperCol: { span: 24 },
};

@Form.create()
// @connect(({ codeLibrariesModel }) => ({ allCodeMgtList: codeLibrariesModel.allCodeMgtList }))
class TypeFetch extends Component {
  state = {
    CodeLibrariesVisible: false,
    selecter: [],
    // selectValue: [],
    cardSelectOption: [],
  };

  componentDidMount() { }



  handleOk = (data) => {
    if (!data) {
      this.setState({
        CodeLibrariesVisible: false,
      })
      return
    }
    const { selecter } = this.state
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
    this.setState({
      // selectValue: val,
      cardSelectOption: option,
    })
    const { addCodeValue, setModelCode } = this.props;
    addCodeValue(option);
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
      addData,
      dataInput,
      deleteData,
      defaultCheck,
      onRemarkChange,
      addCard,
      codeSelecter = [],
      onRadioChange,
      typeNameInput,
      carClose,
      allCodeMgtList,
      sourceItem,
    } = this.props;
    const {
      CodeLibrariesVisible,
      cardSelectOption,
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
      // <Card className={styles.root} title="模板名称：规格类型 + 取值">
      <Form {...formItemLayout} className={styles.root}>
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

        <Item label="规格参数类型和值配置" {...blockItemLayout} required>
          {codeSelecter.map((item, index1) => {
            if (!item.data) {
              item.data = []
            }
            // console.log(item)
            return (
              <Card
                size="small"
                title={`${item.typeName}`}
                extra={
                  <a>
                    <Zcon type="close" onClick={() => carClose(item.id)} />
                  </a>
                }
                key={item.id}
                style={{ width: 300, marginBottom: 12 }}
              >
                <Item label="类型名称" {...panelItemLayout}>
                  <Input value={item.typeName} onChange={typeNameInput.bind(index1, item.id)} />
                </Item>
                {item.data.map((ele, index) => (
                  <div key={ele.id}>
                    <Item label="取值" {...panelItemLayout}>
                      <Row type="flex" justify="center" align="middle">
                        <Col span={10}>
                          <Input value={ele.name} onChange={dataInput.bind(index, item.id)} id={`${ele.id}`} />
                        </Col>
                        <Col span={4} style={{ textAlign: "center" }}>
                          <Button icon="delete-o" type="link" onClick={() => deleteData(ele.id, item.id)} />
                        </Col>
                        <Col span={10}>
                          <Checkbox onChange={defaultCheck.bind(index, item.id)} id={`${ele.id}`} checked={ele.isCheck || false} />
                          &nbsp;默认勾选
                        </Col>
                      </Row>
                    </Item>
                    {cardSelectOption.map((element, i) => {
                      const { code, codeName, type, optionvalue: valueArr, unit } = element.props;
                      const radioValue = ele.data.find((radioCode) => (radioCode.code === code))
                      let res = null;
                      if (type === 1 && valueArr) {
                        // 去除头尾的方括号
                        const radioOptions = valueArr.slice(1, -1).split(',');
                        res = (
                          <Item label={`${codeName}取值`} {...panelItemLayout}>
                            <Row type="flex" justify="center" align="middle">
                              <Radio.Group
                                className={styles.radio}
                                buttonStyle='outline'
                                onChange={onRadioChange.bind(i, { Id2: ele.id, Id1: item.id, code, title: codeName, unit })}
                                value={radioValue ? radioValue.value : ''}
                              >
                                {radioOptions.map((radio) => (
                                  <Radio.Button key={radio} value={radio}>{radio}</Radio.Button>
                                ))}
                              </Radio.Group>
                            </Row>
                          </Item>
                        )
                      } else {
                        res = null;
                      }
                      return res;
                    })}
                  </div>
                ))}
                <Item {...buttonLayout}>
                  <Button
                    type="dashed"
                    style={{ width: "100%" }}
                    onClick={() => { addData(item.id); this.handleSelectChange('selectValue', cardSelectOption) }}
                  >
                    <Zcon type="plus" />
                    添加规格参数取值
                  </Button>
                </Item>
              </Card>
            )
          })}
        </Item>
        <Button type="dashed" style={{ width: "100%", marginBottom: 12 }} onClick={() => { addCard() }}>
          <Zcon type="plus" />
          添加规格参数类型
        </Button>
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
      // </Card>
    );
  }
}
export default TypeFetch;
