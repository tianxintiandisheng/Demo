/**
 * @file 选择器和复选框组的综合组件
 * @description 用于数据联动组件
 * @author tiandisheng
 * */

import React from "react";
import { Row, Col, Select, Icon } from 'antd';
import CardGroup from "../CardGroup";
import styles from "./SelectCondition.less";

const { Option } = Select;

class SelectCondition extends React.Component {
  // state = {
  //   sourceItem: '', // 当前选中的组件数据
  // };

  componentDidMount() {
    // const { ruleDataLinkage } = sourceItem;
    // const { sourceItem, sourceIdList, indexRule, indexCondition } = this.props;
    // const { id } = ruleDataLinkage[indexRule].conditions[indexCondition];
    // const newSourceItem = sourceIdList.find((item) => item.id === id);
    // console.log('newSourceItem', newSourceItem)
    // this.setState({

    //   sourceItem,
    // })
  }

  /**
   * @function 选择器change事件,更新当前选中的组件数据
   * @param {string} 选择器选中的值
   * */
  handleChange = (value) => {
    this.updateRuleDataLinkage(value);

  }

  /**
   * @function 更新RuleDataLinkage的数据
   * @param {string} 选择器选中的值
   * */
  updateRuleDataLinkage = (value) => {
    const { onChangeConditionSelect, indexRule, indexCondition } = this.props;
    onChangeConditionSelect(value, indexRule, indexCondition)
  }

  /**
   * @function 过滤数组中当前组件和容器组件数据,生成新的数组
   * @returns {array} newSourceIdList
   * */
  filterSourceIdList = () => {
    const { sourceIdList, sourceItem } = this.props;
    const { id: curId } = sourceItem; // 当前组件id
    const newSourceIdList = sourceIdList.filter((item) => {
      let shouldOption = true; // 数据是否需要渲染为选项
      switch (true) {
        case item.id === curId:
          shouldOption = false;
          break;
        case item.checkType === '1':
          shouldOption = true;
          break;
        case item.checkType === '2':
          shouldOption = true;
          break;
        default:
          shouldOption = false;
          break;
      }
      return shouldOption;
    })
    return newSourceIdList;
  }

  /**
   * @function 渲染选择器选项
   * @returns {array} react element
   * */
  renderOption = () => {
    const newSourceIdList = this.filterSourceIdList();
    const optionElement = newSourceIdList.map((item, index) => {
      const optionItem = (
        <Option value={item.id} key={index}>
          {item.modelName ? item.modelName : '默认名称'}
        </Option>
      );
      return optionItem;
    });
    return optionElement;
  }

  /**
   * @function 渲染删除图标
   * */
  rederDeleteIcon = () => {
    const { isFirst, indexRule, indexCondition, deleteCondition } = this.props;
    let deleteIcon = null;
    if (!isFirst) {
      deleteIcon = (
        <a>
          <Icon type="delete" onClick={() => deleteCondition(indexRule, indexCondition)} />
        </a>
      );
    };
    return deleteIcon;
  }





  render() {
    const {
      sourceItem,
      isFirst,
      indexRule,
      indexCondition,
      onChangeCondition,
      sourceIdList,
      selectId,
    } = this.props;
    return (
      <div className={styles.root}>
        <Row>
          <Col span={5}>
            <span className={styles.text}>
              {isFirst ? '当组件' : '且当组件'}
            </span>
          </Col>
          <Col span={12}>
            <Select
              style={{ marginRight: 2, marginLeft: 2 }}
              onChange={this.handleChange}
              value={selectId}
              placeholder='选择参数名称'
            >
              {this.renderOption()}
            </Select>
          </Col>
          <Col span={7}>
            <span className={styles.textRight}>的选项为:</span>
            {this.rederDeleteIcon()}
          </Col>
        </Row>
        <CardGroup
          type='condition'
          sourceIdList={sourceIdList}
          sourceItem={sourceItem}
          selectId={selectId}

          indexRule={indexRule}
          indexCondition={indexCondition}
          onChangeCondition={onChangeCondition}
        />
      </div>
    );
  }
};



export default SelectCondition;
