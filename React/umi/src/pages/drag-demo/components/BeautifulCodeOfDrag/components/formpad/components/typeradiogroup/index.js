import React, { Component } from "react";
import PropTypes from "prop-types";
import styles from "./TypeRadioGroup.less";
import CpuGroup from './CpuGroup';

class TypeRadioGroup extends Component {
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
      activeId: value.id,
      selectedData: value.data || {},
      cpuGroupData: [],
    };
  }

  onSelectChange = (selected) => {
    if (!('value' in this.props)) {
      this.setState({ activeId: selected.id, selectedData: {} });
    }
    this.setState({ cpuGroupData: selected.data || [] });
    this.triggerChange({ id: selected.id, data: {} });
  };

  triggerChange = changedValue => {
    // Should provide an event to pass value to Form.
    const { onChange } = this.props;
    if (onChange) {
      onChange(changedValue)
    }
  };

  handleCpuGroupChange = (item) => {
    if (!('value' in this.props)) {
      this.setState({ selectedData: item });
    }
    const { value } = this.props;
    this.triggerChange({ id: (value || {}).id, data: item });
  }

  render() {
    const { data, value = {} } = this.props;
    const { activeId, cpuGroupData, selectedData } = this.state;
    const newValue = ('value' in this.props) ? value.id : activeId;
    const newSelectedData = ('value' in this.props) ? (value.data || {}) : selectedData;
    const newGroupData = cpuGroupData.length > 0 ? cpuGroupData : data.length > 0 ? ((data[0] || {}).data || []) : [];
    return (
      <>
        <div className={styles.root}>
          {data.map(ele => {
            const isActive = newValue === ele.id;
            return (
              <div
                key={ele.id}
                className={`${styles.item} ${isActive ? styles.activeItem : ''}`}
                onClick={() => { this.onSelectChange(ele) }}
              >
                <span>{ele.name}</span>
              </div>
            );
          })}

        </div>
        <CpuGroup
          data={newGroupData}
          value={newSelectedData}
          onChange={this.handleCpuGroupChange}
        />
      </>
    );
  }
}

export default TypeRadioGroup;
