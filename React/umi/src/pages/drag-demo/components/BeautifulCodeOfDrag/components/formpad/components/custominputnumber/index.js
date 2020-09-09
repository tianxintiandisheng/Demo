import React, { Component } from "react";
import PropTypes from "prop-types";
import { InputNumber } from "antd";
import styles from "./CustomInputNumber.less";

class CustomInputNumber extends Component {
  static propTypes = {
    min: PropTypes.number,
    data: PropTypes.object,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    min: 0,
    data: {},
    onChange: () => {},
  };

  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    if ("value" in nextProps) {
      return {
        ...(nextProps.value || {}),
      };
    }
    return null;
  }

  constructor(props) {
    super(props);

    const value = props.value || {};
    this.state = {
      value,
    };
  }

  handleChange = (count, data) => {
    if (Number.isInteger(count)) {
      const newData = { ...data, value: count };
      if (!("value" in this.props)) {
        this.setState({ value: newData });
      }
      this.triggerChange(newData);
    }
  };

  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue);
    }
  };

  render() {
    const { value } = this.state;
    const { min, data, unit = "", value: propsValue } = this.props;
    const newValue = "value" in this.props ? propsValue : value;
    return (
      <div className={styles.root}>
        <InputNumber
          min={min}
          value={newValue.value}
          onChange={count => this.handleChange(count, data)}
          className={styles.input__number}
        />
        <span className={styles.unit}>{unit}</span>
      </div>
    );
  }
}

export default CustomInputNumber;
