import React from "react";
// import PropTypes from "prop-types";
import { Select, Icon } from 'antd';

import styles from "./SelectUserDefine.less";


const { Option } = Select;
class SelectUserDefine extends React.Component {
  handleChange = (value) => {
    console.log(`selected ${value}`);
  }

  render() {
    // 该属性设置类名为dropdown的元素样式
    const dropdownStyle = {
      border: '1px solid red',
    }
    // 该属性设置类名为dropdown-menu的元素样式
    const dropdownMenuStyle = {
      backgroundColor: 'green',
    }

    return (
      <div className={styles.root} >
        <Select
          defaultValue="year"
          // open // 固定展开,便于调试
          onChange={this.handleChange}
          dropdownStyle={dropdownStyle}
          dropdownMenuStyle={dropdownMenuStyle}
          suffixIcon={<Icon type="caret-up" />}
        >
          <Option value="year">近一年</Option>
          <Option value="month">近一月</Option>

          <Option value="day">近七日</Option>
        </Select>

      </div>
    );
  }
};

// SelectUserDefine.propTypes = {
//   className: PropTypes.string,
//   style: PropTypes.object,
// };

// SelectUserDefine.defaultProps = {
//   className: "",
//   style: {},
// };

export default SelectUserDefine;
