/**
 * @file 复选框组组件
 * @description 用于数据联动组件
 * @author tiandisheng
 * */

import React from "react";
import { Card, Checkbox, Row, Col, Tree } from 'antd';
import styles from "./CardGroup.less";

const { TreeNode } = Tree;



class CardGroup extends React.Component {

  // state = {
  //   checkedList: [],
  //   indeterminate: false, // 有选项但非全选样式控制;true 有选项但非全选样式;
  //   checkAll: false, // 全选样式控制;true 全选样式(对号); 
  // };


  /**
   * @function 获取sourceItem
   * @returns {array} sourceItem
   * */
  getSourceItemByType = () => {
    const { type, sourceIdList, selectId } = this.props;
    let { sourceItem } = this.props;
    switch (true) {
      case type === 'condition':
        sourceItem = sourceIdList.find((item) => item.id === selectId);
        break;
      default:
        break;
    }
    return sourceItem;
  }

  /**
   * @function 获取复选框的值
   * @returns {array} checkedList
   * */
  getCheckedListByType = () => {
    const { type, indexRule, indexCondition } = this.props;
    const { sourceItem: selectIdCur } = this.props;
    let checkedList = [];
    switch (true) {
      case selectIdCur.ruleDataLinkage && type === 'condition':
        checkedList = selectIdCur.ruleDataLinkage[indexRule].conditions[indexCondition].value;
        break;
      case selectIdCur.ruleDataLinkage && type === 'controlled':
        checkedList = selectIdCur.ruleDataLinkage[indexRule].controlled.value;
        break;
      default:
        break;
    }
    return checkedList
  }


  /**
  * @function 判断是否需要渲染数据联动的复选框
  * @returns {boolean} 
  * */
  isRenderContent = (sourceItem) => {

    let stateIsRanderContent = false;
    switch (true) {
      case sourceItem && sourceItem.checkType === '1':
        if (
          sourceItem.data
          && sourceItem.data.length > 0
          && sourceItem.data[0].data
          && sourceItem.data[0].data.length > 0
        ) {
          stateIsRanderContent = true;
        }
        break;
      case sourceItem && sourceItem.checkType === '2':
        if (
          sourceItem.data
          && sourceItem.data.length > 0
        ) {
          stateIsRanderContent = true;
        }
        break;
      default:
        break;
    }
    return stateIsRanderContent;
  }

  /**
   * @function 获取数组的长度
   * @param {array} sourceItem 指定模板的数据
   * @returns {number} 数组长度
   * */
  getArraylength = (sourceItem) => {
    let lengthNumber = 0;
    switch (sourceItem.checkType) {
      case '1':
        lengthNumber = sourceItem.data.length;
        sourceItem.data.forEach((item) => {
          lengthNumber += item.data.length;
        })
        break;
      case '2':
        lengthNumber = sourceItem.data.length;
        break;

      default:
        break;
    }
    return lengthNumber;
  }

  /**
   * @function 获取全选时数组值
   * @param {array} sourceItem 指定模板的数据
   * @returns {arrray} 全选时checkedList的值
   * */
  getCheckAllArray = (sourceItem) => {

    let checkAllArray = [];
    switch (sourceItem.checkType) {
      case '1':
        sourceItem.data.forEach((itemData, index) => {
          checkAllArray.push(`${index}`)
          if (itemData.data && itemData.data.length > 0) {
            itemData.data.forEach((_, indexChild) => {
              checkAllArray.push(`${index}-${indexChild}`);
            })
          }
        });
        break;
      case '2':
        checkAllArray = sourceItem.data.map((_, index) => `${index}`);
        break;
      default:
        break;
    }
    return checkAllArray;

  }


  /**
   * @function 更新数据至父组件
   * @param {array} checkedList
   * */
  updateRuleData = (checkedList) => {
    const { type, indexRule, indexCondition, onChangeCondition, onChangeControlled } = this.props;
    const sourceItem = this.getSourceItemByType();
    switch (type) {
      case 'controlled':
        onChangeControlled(sourceItem.id, checkedList, indexRule);
        break;
      case 'condition':
        onChangeCondition(sourceItem.id, checkedList, indexRule, indexCondition);
        break;
      default:
        break;
    };
  }

  /**
   * @function 复选框组变化事件
   * */
  onCheck = checkedList => {
    this.updateRuleData(checkedList);
  };

  /**
   * @function 类型-全选复选框变化事件
   * */
  onCheckAllChange = e => {
    const sourceItem = this.getSourceItemByType();
    const checkedList = e.target.checked ? this.getCheckAllArray(sourceItem) : [];
    this.updateRuleData(checkedList);

  };

  renderTreeNodes = (data) =>
    data.map((item, index) => {
      if (item.data && item.name) {
        return (
          <TreeNode title={item.name} key={`${index}`}>
            {item.data.map((itemChild, indexChild) => {
              return (
                <TreeNode title={itemChild.name} key={`${index}-${indexChild}`} />
              );
            })}
          </TreeNode>
        );
      }
      return <TreeNode title={item.name} key={`${index}`} />;
    });


  renderCheckBox = (data) =>
    data.map((item, index) => {
      return (
        <Col span={24} key={index}>
          <Checkbox value={`${index}`}>{item.name}</Checkbox>
        </Col>
      );
    })


  /**
   * @function 渲染复选框组
   * @param {array} sourceItem 模板数据
   * */
  renderCard = (sourceItem) => {

    let contentElement = null;
    const checkedList = this.getCheckedListByType();
    const indeterminate = checkedList && !!checkedList.length && checkedList.length < this.getArraylength(sourceItem);
    const checkAll = checkedList && checkedList.length === this.getArraylength(sourceItem);
    switch (sourceItem.checkType) {
      case '1':
        contentElement = (
          <Card
            style={{ width: 280, marginTop: 16, marginRight: 2 }}
            type="inner"
            title={
              <div className={styles.notAll}>
                <Checkbox
                  indeterminate={indeterminate}
                  onChange={this.onCheckAllChange}

                  checked={checkAll}
                >
                  类型+取值
                </Checkbox>
              </div>
            }
          >
            <div className={styles.childCheck}>
              <Tree
                checkable
                onCheck={this.onCheck}
                checkedKeys={checkedList}
                defaultCheckedKeys={checkedList}
              >
                {this.renderTreeNodes(sourceItem.data)}
              </Tree>
            </div>
          </Card>
        );
        break;
      case '2':
        contentElement = (
          <Card
            style={{ width: 280, marginTop: 16 }}
            type="inner"
            title={
              <div className={styles.notAll}>
                <Checkbox
                  indeterminate={indeterminate}
                  onChange={this.onCheckAllChange}
                  checked={checkAll}
                >
                  取值
                </Checkbox>
              </div>
            }
          >
            <div className={styles.childCheck}>
              <Checkbox.Group
                style={{ width: '100%' }}
                onChange={this.onCheck}
                defaultValue={checkedList}
                value={checkedList}
              >
                <Row>
                  {this.renderCheckBox(sourceItem.data)}
                </Row>
              </Checkbox.Group>
            </div>
          </Card>
        );
        break;
      default:
        break;
    }
    return contentElement;
  }

  renderContent = () => {
    const { type } = this.props;
    const sourceItem = this.getSourceItemByType();
    let contentElement = null;
    switch (true) {
      case type === 'condition':
        if (this.isRenderContent(sourceItem)) {
          contentElement = this.renderCard(sourceItem);
        }
        break;
      case type === 'controlled':
        if (this.isRenderContent(sourceItem)) {
          contentElement = this.renderCard(sourceItem);
        }
        break;
      default:
        break;
    }
    return contentElement;
  }

  render() {
    return (
      <div className={styles.root}>
        {this.renderContent()}
      </div>
    );
  }
};


export default CardGroup;
