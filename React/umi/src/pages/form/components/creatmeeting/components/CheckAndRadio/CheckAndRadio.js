import React from "react";
import { Input, Checkbox, Radio } from 'antd';
// import styles from "./CheckAndRadio.less";

class CheckAndRadio extends React.Component {
  handleLabelTextChange = e => {
    const labelText = e.target.value;
    this.triggerChange({ labelText });
  };

  handleRadioValueChange = e => {
    const radioValue = e.target.value;
    this.triggerChange({ radioValue });
  };

  /**
   * @function 接受父组件onChange事件
   * @param {object} formItemValue 表单控件的值
   * */
  triggerChange = formItemValue => {
    const { onChange, value } = this.props;
    if (onChange) {
      onChange({
        ...value,
        ...formItemValue,
      });
    }
  };

  render() {
    const { value } = this.props;
    return (
      <span>
        <Input
          type="text"
          value={value.labelText}
          onChange={this.handleLabelTextChange}
          style={{ width: '65%', marginRight: '3%' }}
        />

        <Radio.Group
          value={value.radioValue}
          onChange={this.handleRadioValueChange}
        >
          <Radio value={1}>是</Radio>
          <Radio value={2}>否</Radio>
        </Radio.Group>
      </span>
    );
  }
};



export default CheckAndRadio;
