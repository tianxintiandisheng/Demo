/**
 * @file 数据联动组件
 * @author tiandisheng
 * */

import React from "react";
import { Card, Button } from 'antd';
import Zcon from "@cbd/icon";
import _ from "lodash";
import CardGroup from "./components/CardGroup";
import SelectCondition from "./components/SelectCondition";
import styles from "./DataLinkage.less";

const ruleInit = {
  name: '数据联动规则',
  conditions: [{
    name: '数据联动条件',
    id: '', // 组件id
    value: [], // 存储数据联动条件的数组
    type: 'and',
  }],
  controlled: {
    name: '受控组件数据',
    id: '', // 组件id
    value: [], // 存储受控组件数据的数组
  },
}

class DataLinkage extends React.Component {
  // state = {
  //   ruleDataLinkage: [ruleInit],
  // };

  /**
   * @function 更新数据联动规则数据数据
   * @param {array} checkedList
   * */
  updateRuleData = (ruleDataLinkage) => {
    const { onRuleDataLinkageChange } = this.props;
    onRuleDataLinkageChange(ruleDataLinkage);
  }

  /**
   * @function 深拷贝数据联动规则数组
   * @returns {array} newRuleDataLinkage
   * */
  deepCopyArray = () => {
    const { sourceItem } = this.props;
    const { ruleDataLinkage } = sourceItem;
    let newRuleDataLinkage = [];
    newRuleDataLinkage = _.defaultsDeep(newRuleDataLinkage, ruleDataLinkage); // 深拷贝
    return newRuleDataLinkage;
  }




  /**
   * @function 添加数据联动规则
   * @param {number} indexRule 数据联动条件所在规则数组索引
   * */
  addRule = () => {
    const newRuleDataLinkage = this.deepCopyArray();
    newRuleDataLinkage.push(ruleInit);
    this.updateRuleData(newRuleDataLinkage);

  }

  /**
   * @function 删除指定数据联动规则
   * @param {number} indexRule 数据所在规则数组索引
   * */
  deleteRule = (indexRule) => {
    const newRuleDataLinkage = this.deepCopyArray();
    newRuleDataLinkage.splice(indexRule, 1);
    this.updateRuleData(newRuleDataLinkage);

  }

  /**
   * @function 添加数据联动条件
   * @param {number} indexRule 数据所在规则数组索引
   * */
  addCondition = (indexRule) => {
    const newRuleDataLinkage = this.deepCopyArray();
    newRuleDataLinkage[indexRule].conditions.push(ruleInit.conditions);
    this.updateRuleData(newRuleDataLinkage);

  }

  /**
   * @function 删除指定数据联动条件
   * @param {number} indexRule 数据所在规则数组索引
   * @param {number} indexCondition 数据所在条件数组中的索引
   * */
  deleteCondition = (indexRule, indexCondition) => {
    const newRuleDataLinkage = this.deepCopyArray();
    newRuleDataLinkage[indexRule].conditions.splice(indexCondition, 1);
    this.updateRuleData(newRuleDataLinkage);
  }

  /**
   * @function 数据联动条件数据变化事件
   * @param {string} id 控制组件id
   * @param {array} value 多选框的值
   * @param {number} indexRule 数据所在规则数组索引
   * @param {number} indexCondition 数据所在条件数组中的索引
   * */
  onChangeCondition = (id, value, indexRule, indexCondition) => {
    const newRuleDataLinkage = this.deepCopyArray();
    newRuleDataLinkage[indexRule].conditions[indexCondition].id = id;
    newRuleDataLinkage[indexRule].conditions[indexCondition].value = value;
    this.updateRuleData(newRuleDataLinkage);
  }

  /**
  * @function 数据联动条件选择器变化事件
  * @description 选择器
  * @param {string} id 控制组件id
  * @param {array} value 多选框的值
  * @param {number} indexRule 数据所在规则数组索引
  * @param {number} indexCondition 数据所在条件数组中的索引
  * */
  onChangeConditionSelect = (id, indexRule, indexCondition) => {
    const newRuleDataLinkage = this.deepCopyArray();
    newRuleDataLinkage[indexRule].conditions[indexCondition].id = id;
    this.updateRuleData(newRuleDataLinkage);
  }

  /**
  * @function 受控组件数据变化事件
  * @param {string} id 受控组件id
  * @param {array} value 多选框的值
  * @param {number} indexRule 数据所在规则数组索引
  * */
  onChangeControlled = (id, value, indexRule) => {
    const newRuleDataLinkage = this.deepCopyArray();
    newRuleDataLinkage[indexRule].controlled.id = id;
    newRuleDataLinkage[indexRule].controlled.value = value;
    this.updateRuleData(newRuleDataLinkage);

  }

  /**
   * @function 渲染数据联动条件的react元素
   * @param {array} conditions 数据联动规则的条件数据
   * @param {number} indexRule 数据联动条件所在规则数组索引
   * @returns {array} react element
   * */
  renderCondition = (conditions, indexRule) => {
    const { sourceIdList, sourceItem } = this.props;

    const conditionsElement = conditions.map((item, index) => {
      let isFirst = 0;
      if (index === 0) {
        isFirst = 1;
      }
      const conditionItem = (
        <SelectCondition
          key={index}
          sourceIdList={sourceIdList}
          sourceItem={sourceItem}
          selectId={item.id}
          conditionType={item.type}
          isFirst={isFirst}
          indexRule={indexRule}
          indexCondition={index}
          deleteCondition={this.deleteCondition}
          onChangeCondition={this.onChangeCondition}
          onChangeConditionSelect={this.onChangeConditionSelect}
        />
      );
      return conditionItem;
    });
    return conditionsElement;
  }

  /**
   * @function 渲染数据联动规则的react元素
   * */
  renderRule = () => {
    let ruleElement = null;
    const { sourceItem } = this.props;
    const { ruleDataLinkage } = sourceItem;


    if (ruleDataLinkage && ruleDataLinkage.length > 0) {
      ruleElement = ruleDataLinkage.map((item, index) => {
        const ruleItem = (
          <Card
            key={index}
            size="small"
            title={`数据联动规则${index + 1}`}
            extra={
              <a>
                <Zcon type="close" onClick={() => this.deleteRule(index)} />
              </a>
            }
            style={{ width: 300, marginBottom: 12 }}
          >
            {this.renderCondition(item.conditions, index)}
            <Button
              type="dashed"
              style={{ width: "100%", marginTop: 12, marginBottom: 12 }}
              onClick={(e) => this.addCondition(index, e)}
            >
              <Zcon type="plus" />
              <span>添加条件</span>
            </Button>
            <span>当前组件的选项自动设置为:</span>
            <CardGroup
              sourceItem={sourceItem}
              type='controlled'
              indexRule={index}
              onChangeControlled={this.onChangeControlled}
            />
          </Card>
        );
        return ruleItem;
      });

    }
    return ruleElement;

  }

  render() {
    return (
      <div className={styles.root}>
        {this.renderRule()}
        <Button
          type="dashed"
          style={{ width: "100%", marginTop: 12, marginBottom: 12 }}
          onClick={this.addRule}
        >
          <Zcon type="plus" />
          <span>添加数据联动规则</span>
        </Button>
      </div>
    );
  }
};



export default DataLinkage;
