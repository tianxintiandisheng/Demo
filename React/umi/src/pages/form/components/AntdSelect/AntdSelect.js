import React from "react";
import { Select } from 'antd';
import styles from "./AntdSelect.less";
const { Option } = Select;

class AntdSelect extends React.Component {
  handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  render() {
    return (
      <div className={styles.root} >
        <Select
          defaultValue="year"
          onChange={this.handleChange}
        >
          <Option value="year">近一年</Option>
          <Option value="month">近一月</Option>

          <Option value="day">近七日</Option>
        </Select>

      </div>
    );
  }
};



export default AntdSelect;
