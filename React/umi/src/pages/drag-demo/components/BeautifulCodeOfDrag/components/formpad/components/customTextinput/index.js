import React, { Component } from "react";
import { Input } from "antd";
import styles from "./customTextinput.less";

class CustomInputText extends Component {



  render() {
    const { value } = this.props;
    return (
      <div className={styles.root}>
        <Input
          placeholder="请输入规格参数名称"
          value={value}
          className={styles.input__number}
        />
      </div>
    );
  }
}

export default CustomInputText;
