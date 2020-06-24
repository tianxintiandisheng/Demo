import React from "react";

import { Select } from 'antd';



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
          defaultValue="lucy"
          // style={{ width: 120 }}
          onChange={this.handleChange}
          defaultOpen
          dropdownClassName={styles.dropdownClassName}
        >
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>

          <Option value="Yiminghe">yiminghe</Option>
        </Select>

      </div>
    );
  }
};



export default MySelect;
