import React, { Component } from "react";
// import { Icon, Button, Select, Upload, Input, Form, Radio, Checkbox, message, Row, Col } from 'antd';

// import { API_PREFIX } from "@/common/constant";
// import BaseRadioGroup from "components/baseradiogroup";
import { Icon, Checkbox } from 'antd';
import TypeRadioGroup from "./components/typeradiogroup";
import CpuGroup from "./components/typeradiogroup/CpuGroup.js";
import CustomInputNumber from "./components/custominputnumber";
import CustomTextInput from "./components/customTextinput";
import ContainerBox from "./components/ContainerBox";
import styles from "./index.less";


class FormPad extends Component {
  state = {
  };

  componentDidMount() {
  }

  // componentWillReceiveProps(prevProps) {

  // }

  /**
   * @function 设置数值模板单位的显示效果
   * @param {object} sourceItem 模板数据
   * @returns {string} 单位的字符串
   * */
  setNumInputUnit = (sourceItem) => {
    let unit = 'GB';
    if (sourceItem && sourceItem.unit) {
      switch (sourceItem.unit) {
        case false:
          unit = '';
          break;
        case 'times':
          unit = '次';
          break;
        case 'unit':
          unit = '个';
          break;
        default:
          ({ unit } = sourceItem);
          break;
      }
    }
    return unit;
  }

  renderFrom = (checkType, sourceItem) => {
    let item = [];
    const { data, remark } = sourceItem;
    // console.log(sourceItem)
    // console.log(data)
    //  let checkBox=false
    // checkType.forEach(element => {
    //   if (element === 2) {
    //     checkBox=true
    //   }
    // });
    switch (checkType) {
      case '1':
        // item = isMultySelect ? <TypeRadioGroup data={data || [{ data: [{ data: [], name: "1核1G", id: 203 }], name: "独享型", id: 213 }]} /> : <BaseRadioGroup data={data || [{ data: [{ data: [], name: "1核1G", id: 203 }], name: "独享型", id: 213 }]} /> 
        item = (
          <div>
            <TypeRadioGroup data={data || [{ data: [{ data: [], name: "1核1G", id: 203 }], name: "独享型", id: 213 }]} />
            <div>{remark}</div>
          </div>
        )

        // {/* 单选 */}

        // {/* 多选 */}
        break;
      case '2':
        item = (
          <div>
            <CpuGroup data={data || [{ data: [{ data: [], name: "1核1G", id: 203 }], name: "独享型", id: 213 }]} />
            <div>{remark}</div>
          </div>
        )
        break;
      case '3':
        item = (
          <div>
            <CustomTextInput {...sourceItem} />
            <div>{remark}</div>
          </div>
        )
        break;
      case '4':
        item = (
          <div>
            <CustomInputNumber unit={this.setNumInputUnit(sourceItem)} data={sourceItem || 0} />
            <div>{remark}</div>
          </div>
        )
        break;
      case '5':
        item = (
          <div>
            <Checkbox checked={sourceItem.isCheck} />
            <div>{remark}</div>
          </div>
        )
        break;
      case '6':
        item = (
          <div>
            <ContainerBox checked={sourceItem.isCheck} sourceItem={sourceItem} />
            <div>{remark}</div>
          </div>
        )
        break;

      default: item = [];
        break;
    }
    return item;
  }

  handleClose = () => {
    const { onRemove = () => { } } = this.props;
    onRemove();
  }

  renderContent = () => {
    const { checkType, sourceItem } = this.props
    let contentElement = (
      <>
        <Icon type="close" className={styles.close} onClick={this.handleClose} />
        <div className={styles.left}>
          {sourceItem.modelName || '默认名称'}
          ：
        </div>
        <div className={styles.right}>{this.renderFrom(checkType, sourceItem)}</div>
      </>
    );
    if (checkType === '6') {
      contentElement = (
        <div className={styles.containerBox}>
          <Icon type="close" className={styles.close} onClick={this.handleClose} />
          <div className={styles.container}>
            {sourceItem.modelName ? `容器:${sourceItem.modelName}` : '未命名容器'}
          </div>
          <div>
            <div className={styles.message}>{this.renderFrom(checkType, sourceItem)}</div>
          </div>

        </div>
      );
    }
    return contentElement;
  }

  render() {
    return (
      <div className={styles.root}>
        {this.renderContent()}
      </div>
    )
  }
}
export default FormPad