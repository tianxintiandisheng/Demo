import React from "react";

import { Select, Icon } from 'antd';



import styles from "./MySelect.less";

const { Option } = Select;

class MySelect extends React.Component {
  handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  render() {

    return (
      <div className={styles.root} >
        <Select
          defaultValue="year"
          open // 固定展开,便于调试
          onChange={this.handleChange}
          dropdownClassName={styles.dropdownClassName}
          suffixIcon={<Icon type="caret-up" />}
        >
          <Option value="year">近一年111111111111</Option>
          <Option value="month">近一月</Option>
          <Option value="day">近七日</Option>
          <Option value="year">近一年111111111111</Option>
          <Option value="month">近一月</Option>
          <Option value="day">近七日</Option>
          <Option value="year">近一年111111111111</Option>
          <Option value="month">近一月</Option>
          <Option value="day">近七日</Option>
          <Option value="year">近一年111111111111</Option>
          <Option value="month">近一月</Option>
          <Option value="day">近七日</Option>
          <Option value="year">近一年111111111111</Option>
          <Option value="month">近一月</Option>
          <Option value="day">近七日</Option>
          <Option value="year">近一年111111111111</Option>
          <Option value="month">近一月</Option>
          <Option value="day">近七日</Option>
          <Option value="year">近一年111111111111</Option>
          <Option value="month">近一月</Option>
          <Option value="day">近七日</Option>
          <Option value="year">近一年111111111111</Option>
          <Option value="month">近一月</Option>
          <Option value="day">近七日</Option>
        </Select>

      </div>
    );
  }
};



export default MySelect;
