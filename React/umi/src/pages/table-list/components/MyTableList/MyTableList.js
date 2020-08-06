import React from "react";
import PropTypes from "prop-types";

import styles from "./MyTableList.less";

class MyTableList extends React.Component{
  render() {
    const { className, ...otherProps } = this.props;
    return (
      <div className={`${styles.root} ${className}`} {...otherProps}>
        This is MyTableList
      </div>
    );
  }
};

MyTableList.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
};

MyTableList.defaultProps = {
  className: "",
  style: {},
};

export default MyTableList;
