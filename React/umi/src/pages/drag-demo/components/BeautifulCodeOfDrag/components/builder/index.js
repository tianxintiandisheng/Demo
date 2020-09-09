import React, { Component } from "react";
import { Typography, Button, message } from 'antd';
import { connect } from 'dva';
import LeftPad from "../leftpad";
import RightPad from "../rightpad";

// import { Icon, Button, Select, Upload, Input, Form, Radio, Checkbox, message } from 'antd';

// import { API_PREFIX } from "@/common/constant";
import styles from "./index.less";

const { Title } = Typography;
@connect()
class Builder extends Component {
  state = {
    sourceId: '', // 当前可拖拽项目id
    sourceIdList: [], // 总的资源规格参数数据
    sourceIdContainer: '', // 容器内-当前可拖拽项目id
    sourceIdListContainer: [], // 容器内-当前资源规格参数数据
  };

  componentDidMount() {
    this.setSourceIdList();
    const { dispatch } = this.props;
    dispatch({
      type: 'codeLibrariesModel/getAllCodeMgtList',
    })
  }



  componentWillReceiveProps(prevProps) {
    const { submit } = prevProps
    if (submit) {
      this.handleSubmit()
    }
  }



  /**
   * @function 新增资源商品第二步的提交事件
   * @description 数据存储;表单验证
   * */
  handleSubmit = () => {
    const { sourceIdList } = this.state;
    console.log(sourceIdList, this.checkSourceIdList(sourceIdList))
    switch (true) {
      case sourceIdList.length === 0:
        message.success('新增内容不能为空');
        break;
      case this.checkSourceIdList(sourceIdList) && sourceIdList.length > 0:
        message.success('资源新增完成');
        break;
      default:
        message.success('缺少参数');
        break;
    }
  };

  /**
   * @function 容器编辑的提交事件
   * @description 数据存储;表单验证
   * */
  handleSubmitContainerEdit = () => {
    const { sourceIdListContainer, sourceId, sourceIdList } = this.state;
    const { setContainerEdit } = this.props;
    if (sourceIdListContainer.length > 0 && this.checkSourceIdList(sourceIdListContainer)) {
      // 表单验证通过,填充数据
      sourceIdList.forEach((item) => {
        if (item.id === sourceId) {
          item.sourceIdListContainer = sourceIdListContainer;
        }
      });
      this.setState({
        sourceIdList,
      });
      message.success('容器编辑完成');
      setContainerEdit();
    } else {
      message.warn('容器编辑缺少必要参数,无法提交');

    }
  };


  /**
   * @function 循环判断数组中的项目是否符合要求
   * @return {boolean} 如果数组中每一项都符合要求,返回true;否则返回,false;
   * */
  checkSourceIdList = (sourceIdList) => {
    for (let i = 0; i < sourceIdList.length; i += 1) {
      if (!this.checkSourceItem(sourceIdList[i])) {
        return false;
      }
    }
    return true;
  }

  checkSourceItem = (sourceItem) => {
    const { modelName } = sourceItem;
    let isPass = false;
    switch (true) {
      case !!modelName:
        isPass = true;
        break;
      default:
        break;
    }
    return isPass;
  }

  /**
   * @function 更新state中sourceIdList和sourceId的值
   * @description 同时设置不可用的编码
   * @param {string} sourceId  容器内-当前可拖拽项目id
   * @param {array} sourceIdListContainer  容器内-当前资源规格参数数据
   * */
  getSourceId = (sourceId, sourceIdListNew) => {
    this.setState({
      sourceId,
      sourceIdList: sourceIdListNew,
    }, () => {
      const { sourceIdList } = this.state;
      this.setDisabledCode(false, sourceIdList);
    })
  }


  /**
   * @function 设置禁用代码
   * @param {boolean} isContainer 是否为容器
   * @param {array} sourceIdList 全部表单项数据
   * @param {array} sourceIdListContainer 当前编辑容器内表单项数据列表
   * */
  setDisabledCode = (isContainer, sourceIdList, sourceIdListContainer) => {
    const { dispatch } = this.props
    // 已经选过的编码不可在选
    const disabledModelCode = new Set();
    sourceIdList.forEach(item => {
      switch (true) {
        case !!item.modelCode:
          item.modelCode.split(',').forEach(code => {
            disabledModelCode.add(code);
          })
          break;
        case item.checkType === '6' && !!item.sourceIdListContainer:
          item.sourceIdListContainer.forEach(containerItem => {
            if (containerItem.modelCode) {
              containerItem.modelCode.split(',').forEach(code => {
                disabledModelCode.add(code);
              });
            };
          });
          break;
        default:
          break;
      }
    });
    if (isContainer) {
      sourceIdListContainer.forEach(containerItem => {
        if (containerItem.modelCode) {
          containerItem.modelCode.split(',').forEach(code => {
            disabledModelCode.add(code)
          });
        };
      })
    };
    // dispatch({
    //   type: 'codeLibrariesModel/setDisabledCode',
    //   payload: disabledModelCode,
    // })
  }

  /**
   * @function 处理返回的资源规格参数配置数据
   * @description  添加id，checkType转换为字符串
   * @param {array} sourceIdList 资源规格参数配置数据
   * @returns 修改后的资源规格参数配置数据
   * @author tds 2020-2-15
   * */
  handleSourceIdList = (sourceIdList) => {
    const sourceIdListNew = sourceIdList.map((element, index,) => {
      element.checkType = `${element.checkType}`
      element.id = `fromId${index}`
      element.data = element.data.map((elementChild, indexChild,) => {
        elementChild.id = `${elementChild.title}${indexChild}`
        return elementChild;
      })
      return element;
    });
    return sourceIdListNew;
  }

  /**
  * @function 如果stateEditor存在props，设置资源规格参数的初始值
  * @description stateEditor为父组件传递过来的一个参数，如果该值存在，则渲染为编辑页面
  * @author tds 2020-2-17
  * */
  setSourceIdList = () => {
    const { stateEditor } = this.props;
    if (stateEditor) {
      const { detailData: { specConfig: sourceIdList } } = this.props;
      const sourceIdListNew = this.handleSourceIdList(sourceIdList);
      this.setState({
        sourceIdList: sourceIdListNew,
      })
    }
  }



  /**
  * @function 更新state中sourceIdList和sourceId的值;同时设置不可用的编码
  * @description 容器数据
  * @param {string} sourceId  容器内-当前可拖拽项目id
  * @param {array} sourceIdListContainer  容器内-当前资源规格参数数据
  * */
  getSourceIdContainer = (sourceIdContainer, sourceIdListNew) => {
    this.setState({
      sourceIdContainer,
      sourceIdListContainer: sourceIdListNew,
    }, () => {
      const { sourceIdList, sourceIdListContainer } = this.state;
      this.setDisabledCode(true, sourceIdList, sourceIdListContainer);
    })
  }

  /**
   * @function 修改当前选中的容器数据
   * */
  changeSourceIdContainer = () => {
    const {
      sourceId,
      sourceIdList,
    } = this.state;
    let sourceIdListContainer = [];
    sourceIdList.forEach((item) => {
      if (item.id === sourceId && item.sourceIdListContainer) {
        ({ sourceIdListContainer } = item);
      }
    });
    this.setState({ sourceIdListContainer })
  }

  /**
  * @function 渲染主体内容
  * */
  renderContent = () => {
    const {
      sourceId,
      sourceIdList,
      sourceIdContainer,
      sourceIdListContainer,
    } = this.state;
    const { isContainerEdit, setContainerEdit } = this.props;
    let contentElement = null;
    if (isContainerEdit) {
      contentElement = (
        <>
          <Title level={2}>容器编辑</Title>
          <div className={styles.flexBox}>
            <div style={{ flex: 1 }}>
              <LeftPad
                getSourceId={this.getSourceIdContainer}
                sourceId={sourceIdContainer}
                sourceIdList={sourceIdListContainer}
                isContainerEdit
              />
            </div>
            <div style={{ width: 353 }}>
              <RightPad
                getSourceId={this.getSourceIdContainer}
                sourceId={sourceIdContainer}
                sourceIdList={sourceIdListContainer}
                setContainerEdit={setContainerEdit}
                changeSourceIdContainer={this.changeSourceIdContainer}
              />
            </div>
          </div>
          <div className={styles.buttonBox}>
            <Button
              className={styles.button}
              type="primary"
              onClick={this.handleSubmitContainerEdit}
            >
              容器编辑完成
            </Button>
            <Button onClick={setContainerEdit}>取消容器编辑</Button>
          </div>
        </>
      );
    } else {
      contentElement = (
        <>
          <div className={styles.flexBox}>
            {/* flex:auto修改为1;参数描述过多导致右侧表单被挤压;2020.04.28 */}
            <div style={{ flex: 1 }}>
              <LeftPad
                getSourceId={this.getSourceId}
                sourceId={sourceId}
                sourceIdList={sourceIdList}
              />
            </div>
            <div style={{ width: 353 }}>
              <RightPad
                getSourceId={this.getSourceId}
                sourceId={sourceId}
                sourceIdList={sourceIdList}
                setContainerEdit={setContainerEdit}
                changeSourceIdContainer={this.changeSourceIdContainer}
              />
            </div>

          </div>
          <div className={styles.buttonBox}>
            <Button
              className={styles.button}
              type="primary"
              onClick={this.handleSubmit}
            >
              新增
              </Button>
            <Button>取消</Button>
          </div>
        </>
      );
    };
    return contentElement;
  }


  render() {
    return (
      <div className={styles.root}>
        {this.renderContent()}
      </div>
    );
  }
}
export default Builder;
