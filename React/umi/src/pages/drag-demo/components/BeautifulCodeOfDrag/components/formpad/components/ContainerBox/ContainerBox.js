import React from "react";
import { Checkbox } from 'antd';
import TypeRadioGroup from "../typeradiogroup";
import CpuGroup from "../typeradiogroup/CpuGroup.js";
import CustomInputNumber from "../custominputnumber";
import CustomTextInput from "../customTextinput";

import styles from "./ContainerBox.less";

class ContainerBox extends React.Component {
  renderFrom = (checkType, sourceItem) => {
    let item = [];
    const { data, remark } = sourceItem;
    switch (checkType) {
      case '1':
        // item = isMultySelect ? <TypeRadioGroup data={data || [{ data: [{ data: [], name: "1核1G", id: 203 }], name: "独享型", id: 213 }]} /> : <BaseRadioGroup data={data || [{ data: [{ data: [], name: "1核1G", id: 203 }], name: "独享型", id: 213 }]} /> 
        item = (
          <div>
            <TypeRadioGroup data={data || [{ data: [{ data: [], name: "1核1G", id: 203 }], name: "独享型", id: 213 }]} />
            <div>{remark}</div>
          </div>
        )

        // {/* 单选 */}

        // {/* 多选 */}
        break;
      case '2':
        item = (
          <div>
            <CpuGroup data={data || [{ data: [{ data: [], name: "1核1G", id: 203 }], name: "独享型", id: 213 }]} />
            <div>{remark}</div>
          </div>
        )
        break;
      case '3':
        item = (
          <div>
            <CustomTextInput {...sourceItem} />
            <div>{remark}</div>
          </div>
        )
        break;
      case '4':
        item = (
          <div>
            <CustomInputNumber unit={sourceItem && sourceItem.unit || 'GB'} data={sourceItem || 0} />
            <div>{remark}</div>
          </div>
        )
        break;
      case '5':
        item = (
          <div>
            <Checkbox checked={sourceItem.isCheck} />
            <div>{remark}</div>
          </div>
        )
        break;
      case '6':
        item = (
          <div>
            <ContainerBox checked={sourceItem.isCheck} sourceItem={sourceItem} />
            <div>{remark}</div>
          </div>
        )
        break;

      default: item = [];
        break;
    }
    return item;
  }

  /**
   * @function 渲染主体内容
   * @param {array} sourceIdListContainer 容器内表单项数据
   * @returns {array} react element
   * */
  renderContent = (sourceIdListContainer) => {
    let contentElement = (
      <div className={styles.message}>
        点击右侧
        <font size="3" color="#2950b8">容器编辑按钮</font>
        进行容器编辑
      </div>
    );
    if (sourceIdListContainer && sourceIdListContainer.length > 0) {
      contentElement = sourceIdListContainer.map((item, index) => {
        const { checkType } = item;
        const contentItem = (
          <div key={index} className={styles.formBox}>
            <div className={styles.left}>
              {item.modelName || '默认名称'}
              ：
            </div>
            <div className={styles.right}>
              {this.renderFrom(checkType, item)}
            </div>
          </div>
        );
        return contentItem;
      })
    }
    return contentElement;
  }

  render() {
    const { sourceItem: { sourceIdListContainer } } = this.props;
    return (
      <div className={styles.root}>
        {this.renderContent(sourceIdListContainer)}
      </div>
    );
  }
};



export default ContainerBox;
