import React, { Component } from "react";
import { Form } from 'antd';
import { connect } from 'dva';

import ParamsCheck from "./components/paramsCheck";
import TypeFetch from "./components/typeFetch";
import Fetch from "./components/fetch";
import NumberInput from "./components/numberInput";
import TextInput from "./components/textInput";
import ContainerEdit from "./components/ContainerEdit";

import styles from "./index.less";

@connect()
class RightPadFrom extends Component {
  state = {
  };

  flag = false

  componentDidMount() {
  }

  // componentWillReceiveProps(nextProps) {

  // }

  renderDetail = (sourceItem = {}) => {
    const { checkType } = sourceItem;
    // const { sourceId, sourceIdList } = this.props
    const { sourceId, sourceIdList } = this.props
    const codeSelecter = sourceItem.data;
    // sourceIdList.forEach(element => {
    //   if (element.id === sourceId) {
    //     codeSelecter = element.data;
    //   }
    // });
    let formItem = []
    switch (checkType) {
      case '1':
        formItem = (
          <TypeFetch
            sourceId={sourceId}
            sourceItem={sourceItem}
            sourceIdList={sourceIdList}
            onCheckboxChange={this.onCheckboxChange}
            onModelNameChange={this.onModelNameChange}
            getCodeData={this.getCodeData}
            codeSelecter={codeSelecter}
            addData={this.addData}
            dataInput={this.dataInput}
            deleteData={this.deleteData}
            defaultCheck={this.defaultCheck}
            onRemarkChange={this.onRemarkChange}
            addCard={this.addCard}
            onRadioChange={this.onRadioChange}
            typeNameInput={this.typeNameInput}
            carClose={this.carClose}
            addCodeValue={this.addCodeValue}
            setModelCode={this.setModelCode}
            onRuleDataLinkageChange={this.onRuleDataLinkageChange}
          />
        )
        break;
      case '2':
        formItem = (
          <Fetch
            sourceId={sourceId}
            sourceItem={sourceItem}
            sourceIdList={sourceIdList}
            onCheckboxChange={this.onCheckboxChange}
            onModelNameChange={this.onModelNameChange}
            getCodeData={this.getCodeData}
            codeSelecter={codeSelecter}
            addData={this.addData}
            dataInput={this.dataInput2}
            deleteData={this.deleteData2}
            defaultCheck={this.defaultCheck2}
            onRemarkChange={this.onRemarkChange}
            typeNameInput={this.typeNameInput}
            onRadioChange={this.onRadioChange}
            addCard={this.addCard}
            addCodeValue={this.addCodeValue}
            setModelCode={this.setModelCode}
            onRuleDataLinkageChange={this.onRuleDataLinkageChange}
          />
        )
        break;
      case '3':
        formItem = (
          <TextInput
            sourceId={sourceId}
            sourceItem={sourceItem}
            onCheckboxChange={this.onCheckboxChange}
            onModelNameChange={this.onModelNameChange}
            getCodeData={this.getCodeData}
            codeSelecter={codeSelecter}
            onRemarkChange={this.onRemarkChange}
            addCodeValue={this.addCodeValue}
            setModelCode={this.setModelCode}
          />
        )
        break;
      case '4':
        formItem = (
          <NumberInput
            sourceId={sourceId}
            sourceItem={sourceItem}
            onCheckboxChange={this.onCheckboxChange}
            onModelNameChange={this.onModelNameChange}
            getCodeData={this.getCodeData}
            codeSelecter={codeSelecter}
            onRemarkChange={this.onRemarkChange}
            setModelCode={this.setModelCode}
            onNumberTypeChange={this.onNumberTypeChange}
            onDefaultValueChange={this.onDefaultValueChange}
            onMaxValChange={this.onMaxValChange}
            onMinValChange={this.onMinValChange}
            addCodeValue={this.addCodeValue}
            onUnitChange={this.onUnitChange}
          />
        )
        break;
      case '5':
        formItem = (
          <ParamsCheck
            sourceId={sourceId}
            sourceItem={sourceItem}
            onCheckboxChange={this.onCheckboxChange}
            onModelNameChange={this.onModelNameChange}
            getCodeData={this.getCodeData}
            codeSelecter={codeSelecter}
            onRemarkChange={this.onRemarkChange}
            addCodeValue={this.addCodeValue}
            setModelCode={this.setModelCode}
          />
        )
        break;
      case '6':
        formItem = (
          <ContainerEdit
            sourceId={sourceId}
            sourceItem={sourceItem}
            onModelNameChange={this.onModelNameChange}
            onRemarkChange={this.onRemarkChange}
            setContainerEdit={this.setContainerEdit}
          />
        )
        break;
      default: formItem = []
        break;
    }
    return (
      formItem
    )
  }

  onModelNameChange = (e) => {
    const { value } = e.target;
    const { sourceId, sourceIdList, getSourceId } = this.props;
    const sourceIdListNew = sourceIdList.map((item) => {
      if (item.id === sourceId) {
        item.modelName = value;
      }
      return item;
    })
    getSourceId(sourceId, sourceIdListNew);
  }

  onRemarkChange = (e) => {
    const { value } = e.target;
    const { sourceId, sourceIdList, getSourceId } = this.props;
    const sourceIdListNew = sourceIdList.map((item) => {
      if (item.id === sourceId) {
        item.remark = value;
      };
      return item;
    })
    getSourceId(sourceId, sourceIdListNew)
  }

  onNumberTypeChange = (e) => {
    const { value } = e.target;
    const { sourceId, sourceIdList, getSourceId } = this.props
    const sourceIdListNew = sourceIdList.map((item) => {
      if (item.id === sourceId) {
        item.numType = value
      }
      return item
    })
    getSourceId(sourceId, sourceIdListNew)
  }

  onDefaultValueChange = (e) => {

    const { sourceId, sourceIdList, getSourceId } = this.props
    const sourceIdListNew = sourceIdList.map((item) => {
      if (item.id === sourceId) {
        item.defVal = e
      }
      return item
    })
    getSourceId(sourceId, sourceIdListNew)
  }

  onMaxValChange = (e) => {

    const { sourceId, sourceIdList, getSourceId } = this.props
    const sourceIdListNew = sourceIdList.map((item) => {
      if (item.id === sourceId) {
        item.maxVal = e

      }
      return item
    })
    getSourceId(sourceId, sourceIdListNew)
  }

  onMinValChange = (e) => {
    const { sourceId, sourceIdList, getSourceId } = this.props
    const sourceIdListNew = sourceIdList.map((item) => {
      if (item.id === sourceId) {
        item.minVal = e;
      }
      return item
    })
    getSourceId(sourceId, sourceIdListNew)
  }

  onUnitChange = (e, unitDisabled) => {
    const { value } = e.target;
    const { sourceId, sourceIdList, getSourceId } = this.props;
    const sourceIdListNew = sourceIdList.map((item) => {
      if (item.id === sourceId) {
        if (unitDisabled) {
          // 数值没有单位
          delete item.unit;
          delete item.type;
        } else {
          // 数值有单位
          item.unit = value;
          item.type = "1"; // 1表示有单位
        }
      }
      return item
    })
    getSourceId(sourceId, sourceIdListNew)
  }

  onCheckboxChange = (checkedValues) => {
    const { sourceId, sourceIdList, getSourceId } = this.props
    const sourceIdListNew = sourceIdList.map((item) => {
      if (item.id === sourceId) {
        item.isMust = false
        item.isMultySelect = false
        item.isCheck = false
        item.isAdd = false
        item.isTextarea = false
        item.isDataLinkage = false
        checkedValues.forEach((ele) => {
          switch (ele) {
            case "1":
            case 1:
              // 必填项
              item.isMust = true
              break;
            case "2":
            case 2:
              // 多填项
              item.isMultySelect = true
              break;
            case "3":
            case 3:
              // 默认勾选
              item.isCheck = true
              break;
            case "4":
            case 4:
              // 可重复添加
              item.isAdd = true
              break;
            case "5":
            case 5:
              // 文本域
              item.isTextarea = true
              break;
            case "6":
            case 6:
              // 数据联动
              item.isDataLinkage = true
              break;
            default:
              break;
          }
        })
        // item.checkType = checkedValues
      }
      return item
    })
    getSourceId(sourceId, sourceIdListNew)
  }

  getCodeData = (data) => {
    // console.log(data)
    const { sourceId, sourceIdList, getSourceId } = this.props
    const sourceIdListNew = sourceIdList.map((item) => {
      if (item.id === sourceId) {
        item.data = data
      }
      return item
    })
    getSourceId(sourceId, sourceIdListNew)
  }


  addData = (id) => {
    const { sourceId, sourceIdList, getSourceId } = this.props
    const sourceIdListNew = sourceIdList.map((item) => {
      // console.log(Math.random() * 10000)
      if (item.id === sourceId) {
        item.data.map((ele) => {
          // console.log(ele)
          if (`${ele.id}` === `${id}`) {
            ele.data.push({ data: [], name: "默认参数名称", itemName: '默认参数名称', id: Date.now() })
          }
          return ele
        })
      }
      return item
    })
    getSourceId(sourceId, sourceIdListNew)
  }

  addCard = (name = "卡片默认名称", typeName = "卡片默认名称") => {
    const { sourceId, sourceIdList, getSourceId } = this.props
    const sourceIdListNew = sourceIdList.map((item) => {
      // console.log(Math.random() * 10000)
      if (item.id === sourceId) {
        if (!item.data) {
          item.data = []
        }
        item.data.push({
          data: [], name, typeName, id: Date.now(),
          value: name,
        })
      }
      return item
    })
    getSourceId(sourceId, sourceIdListNew)
  }

  typeNameInput = (codeId, e) => {
    const { target } = e
    const { value } = target
    const { sourceId, sourceIdList, getSourceId } = this.props
    const sourceIdListNew = sourceIdList.map((item) => {
      if (item.id === sourceId) {
        item.data.map((ele, thisindex) => {
          // console.log(ele)
          if (`${ele.id}` === `${codeId}`) {
            const params = item.data[thisindex]
            params.name = value
            params.typeName = value
            item.data.splice(Number(thisindex), 1, params)
          }
          return ele
        })
      }
      return item
    })
    getSourceId(sourceId, sourceIdListNew)
  }

  carClose = (codeId) => {
    const { sourceId, sourceIdList, getSourceId } = this.props
    const sourceIdListNew = sourceIdList.map((item) => {
      if (item.id === sourceId) {
        item.data.map((ele, thisindex) => {
          // console.log(ele)
          if (`${ele.id}` === `${codeId}`) {
            item.data.splice(Number(thisindex), 1)
          }
          return ele
        })
      }
      return item
    })
    getSourceId(sourceId, sourceIdListNew)
  }

  dataInput = (codeId, e) => {
    const { target } = e
    const { id, value } = target
    // console.log(e)
    // console.log(codeId)
    // console.log(id)
    const { sourceId, sourceIdList, getSourceId } = this.props
    const sourceIdListNew = sourceIdList.map((item) => {
      if (item.id === sourceId) {
        item.data.map((ele) => {
          if (`${ele.id}` === `${codeId}`) {
            let thisindex = ''
            // console.log(ele)
            ele.data.forEach((element, index) => {
              if (`${element.id}` === `${id}`) {
                thisindex = index
              }
            })
            // console.log(thisindex)
            const params = ele.data[thisindex]
            params.name = value;
            params.value = value;
            params.itemName = value;
            ele.data.splice(Number(thisindex), 1, params)
          }
          return ele
        })

        // item.data.data = item.data.data
      }
      return item
    })
    getSourceId(sourceId, sourceIdListNew)
  }

  dataInput2 = (codeId, e) => {
    const { target } = e
    const { value } = target
    // console.log(e)
    // console.log(codeId)
    // console.log(id)
    const { sourceId, sourceIdList, getSourceId } = this.props
    const sourceIdListNew = sourceIdList.map((item) => {
      if (item.id === sourceId) {
        item.data.forEach((ele) => {
          if (`${ele.id}` === `${codeId}`) {
            ele.name = value
            ele.itemName = value
            ele.value = value;
          }
          return ele
        })

        // item.data.data = item.data.data
      }
      return item
    })
    getSourceId(sourceId, sourceIdListNew)
  }

  deleteData = (id, codeId) => {
    const { sourceId, sourceIdList, getSourceId } = this.props
    const sourceIdListNew = sourceIdList.map((item) => {
      if (item.id === sourceId) {
        item.data.map((ele) => {
          if (`${ele.id}` === `${codeId}`) {
            let thisindex = ''
            ele.data.forEach((element, index) => {
              if (`${element.id}` === `${id}`) {
                thisindex = index
              }
            })
            ele.data.splice(Number(thisindex), 1)
          }
          return ele
        })
        // item.data.data = item.data.data
      }
      return item
    })
    getSourceId(sourceId, sourceIdListNew)
  }

  deleteData2 = (id, codeId) => {
    const { sourceId, sourceIdList, getSourceId } = this.props
    const sourceIdListNew = sourceIdList.map((item) => {
      if (item.id === sourceId) {
        item.data.forEach((ele, index) => {
          let thisindex = -1;
          if (`${ele.id}` === `${codeId}`) {
            thisindex = index;
          }
          if (thisindex > -1) {
            item.data.splice(Number(thisindex), 1)
          }
        })
      }
      return item
    })
    getSourceId(sourceId, sourceIdListNew)
  }

  defaultCheck = (codeId, e) => {
    // console.log(codeId)
    const { target } = e
    // console.log(target)
    const { id, checked } = target
    const { sourceId, sourceIdList, getSourceId } = this.props
    const sourceIdListNew = sourceIdList.map((item) => {
      if (item.id === sourceId) {
        item.data.map((ele) => {
          if (`${ele.id}` === `${codeId}`) {
            let thisindex = ''
            ele.data.forEach((element, index) => {
              if (`${element.id}` === `${id}`) {
                thisindex = index
              }
            })
            const params = ele.data[thisindex]
            params.isCheck = checked
            ele.data.splice(Number(thisindex), 1, params)
          }
          return ele
        })
        // item.data.data = item.data.data
      }
      return item
    })
    getSourceId(sourceId, sourceIdListNew)
  }

  defaultCheck2 = (codeId, e) => {
    // console.log(codeId)
    const { target } = e
    // console.log(target)
    const { checked } = target
    const { sourceId, sourceIdList, getSourceId } = this.props
    const sourceIdListNew = sourceIdList.map((item) => {
      if (item.id === sourceId) {
        item.data.forEach((ele) => {
          if (`${ele.id}` === `${codeId}`) {
            ele.isCheck = checked
          }
          return ele
        })
      }
      return item
    })
    getSourceId(sourceId, sourceIdListNew)
  }

  onRadioChange = (codeData, e) => {
    const { target } = e
    const { value } = target
    // id1外层id2内层
    const { Id1, Id2, code, title, unit } = codeData;
    // // console.log(target)
    const { sourceId, sourceIdList, getSourceId } = this.props
    const sourceIdListNew = sourceIdList.map((item) => {
      if (item.id === sourceId) {
        item.data.map((ele) => {
          if (`${ele.id}` === `${Id1}`) {
            ele.data.forEach((element) => {
              if (`${element.id}` === `${Id2}`) {
                let thisindex = null
                element.data.forEach((ele1, index) => {
                  if ((ele1 && `${ele1.code}`) === `${code}`) {
                    thisindex = index
                  }
                })
                // console.log(thisindex)
                if (thisindex === undefined || thisindex === null) {
                  element.data.push({
                    code,
                    value,
                    title,
                    unit,
                    type: "1", // 1表示有单位
                  })
                } else {
                  element.data.splice(Number(thisindex), 1, {
                    code,
                    value,
                    title,
                    unit,
                    type: "1", // 1表示有单位
                  })
                }

              }
            })
          }
          return ele
        })
        // item.data.data = item.data.data
      }
      return item
    })
    getSourceId(sourceId, sourceIdListNew)
  }



  /**
   * @function 规格参数编码选择器的选择事件
   * @param {object} option react元素
   * 
   * */
  setModelCode = (option) => {
    const { sourceId, sourceIdList, getSourceId } = this.props
    const sourceIdListNew = sourceIdList.map((item) => {
      if (item.id === sourceId) {
        if (!item.data) {
          item.data = []
        }
        if (option) {
          if (option.map) {
            item.modelCode = option.map(optionItem => optionItem.props.code).join(',');
          } else {
            item.modelCode = option.props.code;
          }
        } else { // 清空至modelCode为空
          item.modelCode = undefined;
        }

      }
      return item
    });
    getSourceId(sourceId, sourceIdListNew)
  }

  /**
   * @function 数据联动规则变化事件
   * @param {array} ruleDataLinkage 数据联动规则数据
   * */
  onRuleDataLinkageChange = (ruleDataLinkage) => {
    const { sourceId, sourceIdList, getSourceId } = this.props;
    const sourceIdListNew = sourceIdList.map((item) => {
      if (item.id === sourceId) {
        item.ruleDataLinkage = ruleDataLinkage;
      }
      return item;
    })
    getSourceId(sourceId, sourceIdListNew);
  }


  addCodeValue = (option) => {
    // console.log(codeData)
    // // console.log(target)
    const { sourceId, sourceIdList, getSourceId } = this.props
    const sourceIdListNew = sourceIdList.map((item) => {
      if (item.id === sourceId) {
        if (!item.data) {
          item.data = []
        }
        item.data.map((ele) => {
          if (!ele.data) {
            ele.data = []
          }

          ele.data.forEach((element) => {
            option.forEach((optionItem) => {
              const arr = element.data.filter((ele1) => (
                `${ele1.code}` === `${optionItem.props.code}`
              ))
              if (arr.length === 0) {
                element.data.unshift({
                  code: optionItem.props.code,
                  value: optionItem.props.remark,
                })
              }
            })
            element.data.forEach((ele3, index) => {
              const arr = option.filter((ele1) => (
                `${ele3.code}` === `${ele1.props.code}`
              ))
              if (arr.length === 0) {
                element.data.splice(Number(index), 1)
              }
            })
            // console.log(thisindex)
            // console.log(value)
            // console.log(code)
          })
          return ele
        })
        // item.data.data = item.data.data
      }
      return item
    })
    // console.log(sourceIdListNew)
    getSourceId(sourceId, sourceIdListNew)
  }

  /**
  * @function 修改容器编辑状态
  * */
  setContainerEdit = () => {
    const { setContainerEdit, changeSourceIdContainer } = this.props;
    setContainerEdit();
    changeSourceIdContainer();
  }

  render() {
    // const { imageUrl, loading } = this.state;
    const { sourceId, sourceIdList } = this.props
    // console.log(sourceId)
    const sourceItem = sourceIdList.find(ele => ele.id === sourceId)
    let name = ''

    switch (sourceItem && sourceItem.checkType) {
      case '1':
        name = '规格类型+取值'
        break;
      case '2':
        name = '取值'
        break;
      case '3':
        name = '文本输入'
        break;
      case '4':
        name = '数值输入'
        break;
      case '5':
        name = '参数确认'
        break;
      case '6':
        name = '容器'
        break;
      default: name = ''
        break;
    }
    return (
      <div className={styles.root}>
        <div className={styles.formwork}>
          模板名称：
          {name}
        </div>
        <div className={styles.detail}>
          {this.renderDetail(sourceItem)}
        </div>
      </div>
    );
  }
}
const RightPad = Form.create({ name: 'RightPadFrom' })(RightPadFrom);
export default RightPad;
