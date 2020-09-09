import React from "react";
import PropTypes from "prop-types";
import { message } from 'antd';
import Builder from "./components/Builder";
import styles from "./BeautifulCodeOfDrag.less";

class BeautifulCodeOfDrag extends React.Component {
  state = {
    submit: false,
    loading: false,
    loadingPage: true,
    detailData: null,
    stateEditor: false, // 该值为true时，渲染为编辑页面
    isContainerEdit: false, // 是否处于容器编辑状态
  };

  /**
 * @function 新增请求的参数校验
 * @description 更新表单数据至当前对象;this.dictionary;this.parmas;
 * @param {string} type  根据此参数不同执行不同的操作;
 * @param {object} changedFields 表单项的具体配置数据
 * @param {string} subassembly  组件名称
 * */
  handleReciveSubmit = (type, changedFields, subassembly) => {
    this.setState({
      submit: false,
    })
    // console.log(type)
    // console.log(changedFields)
    this.dictionary[subassembly] = type; // 更新组件的**状态**至当前对象的属性中
    if (type === 'values') {
      this.parmas = { ...this.parmas, ...changedFields } // 更新组件的表单项**数据**至当前对象的属性中
      // console.log(this.parmas)
    } else if (type === 'err') {
      message.error('缺少商品必要参数，请完整填写配置')
    }
  }

  /**
  * @function 修改容器编辑状态
  * @author tds 2020-07-08
  * */
  setContainerEdit = () => {
    const { isContainerEdit } = this.state;
    this.setState({
      isContainerEdit: !isContainerEdit,
    })
  }

  /**
 * @function 获取商品资源id
 * @description 从props的路由中获取id,如果路由中没有,返回的的id值为false
 * @returns id 
 * @author tds 2020-2-9
*/
  getId = () => {
    let id = false;
    // const { location: { state } } = this.props; // 根据该值判断id是否存在路由中
    // if (state) {
    //   ({ id } = state); // 圆括号是必须的，否则会报错。因为解析器会将起首的大括号，理解成一个代码块，而不是赋值语句
    // }
    return id;
  }


  render() {
    const { className, ...otherProps } = this.props;
    const { submit, detailData, isContainerEdit } = this.state;
    return (
      <div className={`${styles.root} ${className}`} {...otherProps}>
        <Builder
          handleReciveSubmit={this.handleReciveSubmit}
          submit={submit}
          isContainerEdit={isContainerEdit}
          setContainerEdit={this.setContainerEdit}
          stateEditor={this.getId()}
          detailData={detailData}
        />
      </div>
    );
  }
};

BeautifulCodeOfDrag.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
};

BeautifulCodeOfDrag.defaultProps = {
  className: "",
  style: {},
};

export default BeautifulCodeOfDrag;
