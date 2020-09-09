import React, { Component } from "react";
import PropTypes from "prop-types";
import { Icon } from "antd";
import styles from "./CpuGroup.less";

class CpuGroup extends Component {
  static propTypes = {
    data: PropTypes.array,
  };

  static defaultProps = {
    data: [],
  };

  static getDerivedStateFromProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
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
      activeValue: value,
    };
  }

  onSelectChange = (selected) => {
    if (!('value' in this.props)) {
      this.setState({ activeValue: selected });
    }
    this.triggerChange(selected);
  };

  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue);
    }
  };

  render() {
    const { data, value } = this.props;
    const { activeValue } = this.state;
    const newValue = ('value' in this.props) ? value : activeValue;
    return (
      <div className={styles.root}>
        {data.map(ele => {
          const isActive = newValue.id === ele.id;
          return (
            <div
              key={ele.id}
              className={`${styles.item} ${isActive ? styles.activeItem : ''}`}
              onClick={() => { this.onSelectChange(ele) }}
            >
              <div>{ele.name}</div>
              <Icon
                className={`${styles.checkIcon} ${isActive ? styles.activeIcon : ''}`}
                type="check-square"
                theme="filled"
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default CpuGroup;
