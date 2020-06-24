import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import _ from "lodash";
import styles from "./ResourceAdd.less";

const grid = 10; // 通用间隔距离
const leftContent = [
  {
    id: '1',
    draggableId: '1',
    title: '类型+取值',
    initTitle: '类型+取值',
    type: 'item',
  },
  {
    id: '2',
    draggableId: '2',
    title: '取值',
    initTitle: '取值',
    type: 'item',
  },
  {
    id: '3',
    draggableId: '3',
    title: '参数确认',
    initTitle: '参数确认',
    type: 'item',
  },
  {
    id: '4',
    draggableId: '4',
    title: '文本输入',
    initTitle: '文本输入',
    type: 'item',
  },
  {
    id: '5',
    draggableId: '5',
    title: '数值输入',
    initTitle: '数值输入',
    type: 'item',
  },
  {
    id: '6',
    draggableId: '6',
    title: '容器',
    initTitle: '容器',
    type: 'container',
  }
]



/**
 * @function 生成排序后的对象数组
 * @param {object} list 排序前对象数组
 * @param {number} startIndex 元素在被拖动前所在索引
 * @param {number} endIndex 元素在被拖动后位置所在索引
 * @param {string} startDroppableId 元素在被拖动前所在容器id
 * @param {string} endDroppableId 元素在被拖动后所在容器id
 * @return {array} result 排序后数组
 * */
const reorder = (list, startIndex, endIndex, startDroppableId, endDroppableId) => {

  console.log('起始位置和终止位置', startDroppableId, endDroppableId)
  let listDeepCopy = {};
  listDeepCopy = _.defaultsDeep(listDeepCopy, list);// 此处需要深拷贝
  // result[droppableId][startIndex] = list[endIndex];
  switch (endDroppableId) {
    case 'leftContent':
      // 最终位置为左侧容器,不进行操作
      break;
    case 'middleContent':
      // 最终位置为中间容器，根据起始位置进行不同操作
      listDeepCopy = sortListEndMiddle(list, startIndex, endIndex, startDroppableId, endDroppableId);
      break;
    default:
      // 判断是拖动前所在容器否为container;是 result[endDroppableId]未定义; 否 result[endDroppableId] 为数组
      // 最终位置为子容器根据是否会覆盖进行操作；

      listDeepCopy = sortListEndContainer(list, startIndex, endIndex, startDroppableId, endDroppableId, list[startDroppableId][startIndex]);
      console.log('放入容器哦', listDeepCopy)
      break;
  }

  console.log('dragArray', listDeepCopy.middleContent)
  return listDeepCopy;
};



/**
 * @function 终止位置为中间容器数组增删项目；终止位置为中间容器数组重新生成draggableId
 * @description 终止位置为中间容器
 * @param {object} list 排序前的对象数组
 * @param {number} startIndex 元素在被拖动前所在索引
 * @param {number} endIndex 新增项目的位置索引
 * @param {string} startDroppableId 元素在被拖动前所在容器id
 * @param {string} endDroppableId 元素在被拖动后所在容器id
 * @param {object} newObject 新增项目
 * @description 创建项目的位置已经存在项目，需要添加新项目并将数组重新排序
 * @returns {object} listDeepCopy
 * */
const sortListEndMiddle = (list, startIndex, endIndex, startDroppableId, endDroppableId,) => {
  let listDeepCopy = {};
  let newObject = null;
  listDeepCopy = _.defaultsDeep(listDeepCopy, list);// 此处需要深拷贝
  switch (startDroppableId) {
    case 'leftContent':
      console.log('起始-左边位置', listDeepCopy);
      newObject = list[startDroppableId][startIndex];
      listDeepCopy = editListItem('add', listDeepCopy, endDroppableId, endIndex, newObject);
      listDeepCopy = rebuildKeyNameAndIdByIndex(listDeepCopy);
      break;
    case 'middleContent':
      console.log('startIndex endIndex', startIndex, endIndex)
      newObject = list[startDroppableId][startIndex];
      listDeepCopy = hanleExchange(listDeepCopy, startDroppableId, startIndex, endIndex);
      listDeepCopy[startDroppableId] = rebuildDroppableArray(listDeepCopy[startDroppableId], startDroppableId);
      listDeepCopy = rebuildKeyNameAndIdByIndex(listDeepCopy);
      break;
    default:
      console.log('起始-其他位置', listDeepCopy);
      const middleIndex = getMiddleIndex(startDroppableId);
      newObject = list.middleContent[middleIndex][startDroppableId][startIndex];
      listDeepCopy = editListItem('add', listDeepCopy, endDroppableId, endIndex, newObject);
      listDeepCopy = editListItem('delete', listDeepCopy, startDroppableId, startIndex, newObject, middleIndex);
      listDeepCopy = rebuildKeyNameAndIdByIndex(listDeepCopy);
      break;
  }
  return listDeepCopy;
}


/**
 * @function 重新生成list中的Droppable数组
 * @param {array} arrayTemp 需要排序的数组
 * @param {string} droppableId 需要重排容器droppableId
 * @returns {object} arrayRebuilded 
 * */
const rebuildDroppableArray = (arrayTemp, droppableId) => {
  console.log('重新生成list中的Droppable数组', arrayTemp);
  let arrayRebuilded = JSON.parse(JSON.stringify(arrayTemp)); // 简单数组的深拷贝
  arrayRebuilded = arrayRebuilded.map((item, index) => {
    const newItem = {
      ...item,
      parent: droppableId,
      draggableId: `${droppableId}-${index}`,
      title: `${item.initTitle}${index}`,
      arrayIndex: index,
    };
    return newItem;
  });
  return arrayRebuilded;
}

/**
 * @function 编辑list中的项目（增加或删除）;该项目重新生成id
 * @description 终止位置为中间容器
 * @param {string} type add 新增 ；delete；删除
 * @param {object} list 对象数组
 * @param {string} droppableId 需要重排容器droppableId
 * @param {number} itemIndex 要更改项目所在索引
 * @param {object} newObject 新增项目
 * @param {number} middleIndex 子容器在中间容器的位置索引
 * @returns {object} listSorted 
 * */
const editListItem = (type, list, droppableId, itemIndex, newObject, middleIndex) => {
  let listDeepCopy = {};
  listDeepCopy = _.defaultsDeep(listDeepCopy, list);// 此处需要深拷贝
  let arrayTemp = null;
  // middleIndex有可能为数值0，所以不能直接作为判断条件
  if (typeof (middleIndex) === 'number') {
    arrayTemp = listDeepCopy.middleContent[middleIndex][droppableId];
  } else {
    arrayTemp = listDeepCopy[droppableId];
  };
  if (type === 'add') {
    console.log('新增项目前', arrayTemp);
    arrayTemp.splice(itemIndex, 0, newObject);
    console.log('新增项目后', arrayTemp);
  } else {
    console.log('删除项目前', arrayTemp);
    arrayTemp.splice(itemIndex, 1);
    console.log('删除项目后', arrayTemp);
  };
  if (typeof (middleIndex) === 'number') {
    listDeepCopy.middleContent[middleIndex][droppableId] = rebuildDroppableArray(arrayTemp, droppableId);
  } else {
    listDeepCopy[droppableId] = rebuildDroppableArray(arrayTemp, droppableId);
  };
  return listDeepCopy;
}

/**
 * @function 终止位置为子容器数组增删项目；终止位置为子容器数组重新生成draggableId
 * @description 终止位置为子容器
 * @param {object} list 排序前的对象数组
 * @param {number} startIndex 元素在被拖动前所在索引
 * @param {number} endIndex 新增项目的位置索引
 * @param {string} startDroppableId 元素在被拖动前所在容器id
 * @param {string} endDroppableId 元素在被拖动后所在容器id
 * @param {object} newObject 新增项目
 * @description 创建项目的位置已经存在项目，需要添加新项目并将数组重新排序
 * @returns {object} listDeepCopy
 * */
const sortListEndContainer = (list, startIndex, endIndex, startDroppableId, endDroppableId, newObject) => {
  let listDeepCopy = {};
  listDeepCopy = _.defaultsDeep(listDeepCopy, list);// 此处需要深拷贝
  const middleIndex = getMiddleIndex(endDroppableId);
  switch (startDroppableId) {
    case 'leftContent':
      // 根据对应子容器数组是否存在进行不同操作
      if (listDeepCopy.middleContent[middleIndex][endDroppableId]) {
        // 子容器数组存在
        listDeepCopy = editListItem('add', listDeepCopy, endDroppableId, endIndex, newObject, middleIndex);
      } else {
        // 子容器数组不存在
        listDeepCopy.middleContent[middleIndex][endDroppableId] = Array.of(list[startDroppableId][startIndex]);// 生成子容器数组
        listDeepCopy.middleContent[middleIndex][endDroppableId] = rebuildDroppableArray(listDeepCopy.middleContent[middleIndex][endDroppableId], endDroppableId);
      }
      break;
    case 'middleContent':
      console.log('listDeepCopy.middleContent[middleIndex][endDroppableId]', listDeepCopy.middleContent[middleIndex][endDroppableId])
      if (listDeepCopy.middleContent[middleIndex][endDroppableId]) {
        // 子容器数组存在
        console.log('listDeepCopy子容器数组存在', listDeepCopy)
        listDeepCopy = editListItem('add', listDeepCopy, endDroppableId, endIndex, newObject, middleIndex);
        listDeepCopy = editListItem('delete', listDeepCopy, startDroppableId, startIndex);
        listDeepCopy = rebuildKeyNameAndIdByIndex(listDeepCopy);
      } else {
        // 子容器数组不存在
        console.log('listDeepCopy子容器数组不存在', listDeepCopy)

        listDeepCopy.middleContent[middleIndex][endDroppableId] = Array.of(list[startDroppableId][startIndex]);// 生成子容器数组
        listDeepCopy.middleContent[middleIndex][endDroppableId] = rebuildDroppableArray(listDeepCopy.middleContent[middleIndex][endDroppableId], endDroppableId);//  子容器数组重新生成id
        listDeepCopy = editListItem('delete', listDeepCopy, startDroppableId, startIndex); // 删除中间容器中项目
        listDeepCopy = rebuildKeyNameAndIdByIndex(listDeepCopy);

        console.log('listDeepCopy', listDeepCopy)
      }
      break;
    default:
      console.log('位置互换')
      break;
  }
  return listDeepCopy;
}

/**
 * @function 子容器数组键名重命名；子容器数组id重新生成
 * @description 处理含有子容器数组的中间容器数组互换事件
 * @param {object} list 排序前的对象数组,传递list而不是listDeepCopy
 * @param {number} prevIndex 之前的位置索引
 * @param {number} curIndex 拖动后的位置索引
 * @returns {object} listDeepCopy
 * */
const handleContainerExchange = (list, prevIndex, curIndex) => {
  let listDeepCopy = {};
  listDeepCopy = _.defaultsDeep(listDeepCopy, list);// 此处需要深拷贝
  const prevKeyName = `container-${prevIndex}`;
  const curKeyName = `container-${curIndex}`;
  console.log('list', list.middleContent)
  console.log('listDeepCopy.middleContent', listDeepCopy.middleContent)
  console.log('prevKeyName', prevKeyName)
  console.log('curKeyName', curKeyName)
  const arrayDeepCopy = rebuildDroppableArray(list.middleContent[prevIndex][prevKeyName], curKeyName);
  console.log(' listDeepCopy.middleContent', listDeepCopy.middleContent)
  listDeepCopy.middleContent[prevIndex][curKeyName] = arrayDeepCopy;
  console.log(' listDeepCopy.middleContent', listDeepCopy.middleContent)
  delete listDeepCopy.middleContent[prevIndex][prevKeyName];
  return listDeepCopy;
}


/**
 * @function 互换中间容器项目位置，重新生成id
 * @description 处理含有子容器数组的中间容器数组互换事件
 * @param {object} list 排序前的对象数组
 * @param {number} startIndex 之前的位置索引
 * @param {number} endIndex 拖动后的位置索引
 * @returns {object} listDeepCopy
 * */
const hanleExchange = (list, droppableId, startIndex, endIndex) => {
  let listDeepCopy = {};
  listDeepCopy = _.defaultsDeep(listDeepCopy, list);// 此处需要深拷贝
  listDeepCopy[droppableId][startIndex] = list[droppableId][endIndex];
  listDeepCopy[droppableId][endIndex] = list[droppableId][startIndex];
  return listDeepCopy;
}


/**
 * @function 据数组索引批量修改所有子容器数组键名;据数组索引批量修改所有子容器数组id
 *  @param {object} list 排序前的对象数组
 *  @returns {object} listDeepCopy
 * */
const rebuildKeyNameAndIdByIndex = (list) => {
  let listDeepCopy = {};
  listDeepCopy = _.defaultsDeep(listDeepCopy, list);// 此处需要深拷贝
  const { middleContent } = listDeepCopy;
  listDeepCopy.middleContent = middleContent.map((item, inex) => {
    console.log('批量修改前', item);
    const keyNameProper = `container-${inex}`;
    const keyNameArray = Object.keys(item);
    const keyName = keyNameArray.find((value) => {
      return value.includes('container')
    })
    console.log('keyNameProper', keyNameProper);
    console.log('keyName', keyName);
    if (keyName && keyNameProper !== keyName) {
      let itemDeepCopy = {};
      itemDeepCopy = _.defaultsDeep(itemDeepCopy, item);// 此处需要深拷贝
      item[keyNameProper] = itemDeepCopy[keyName];
      delete item[keyName];
      console.log('批量修改后', item);
      rebuildDroppableArray(item[keyNameProper], keyNameProper);
    }
    return item;
  })
  return listDeepCopy;
}

/**
 * @function 获取子容器在中间容器的位置索引
 * @param {string} droppableId 子容器的droppableId
 * @returns {number} middleIndex
 * */
const getMiddleIndex = (droppableId) => {
  const endDroppableIdArray = droppableId.split('-');
  const middleIndex = parseInt(endDroppableIdArray[1]);
  return middleIndex;
}





// 设置样式
/**
 * @function 设置样式
 * @param {boolean} isDragging 是否在拖拽状态；
 * @param {object} draggableStyle
 * @returns {object} styleOnject 存储样式的对象
 * */
const setItemStyle = (isDragging, draggableStyle) => {
  // console.log('isDragging', isDragging);
  // console.log('draggableStyle', draggableStyle)
  const styleOnject = {
    // some basic styles to make the items look a bit nicer 一些基本的样式可以让衣服看起来更好看
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // 拖拽的时候背景变化
    background: isDragging ? "lightgreen" : "#ffffff",

    // styles we need to apply on draggables 我们需要应用于拖放的样式
    ...draggableStyle
  }
  return styleOnject;
};

/**
 * @function 设置样式
 * @param {boolean} isDragging 是否在拖拽状态；
 * @param {object} draggableStyle
 * @returns {object} styleOnject 存储样式的对象
 * */
const setContainerStyle = (isDragging, draggableStyle) => {
  // console.log('isDragging', isDragging);
  // console.log('draggableStyle', draggableStyle)
  const styleOnject = {
    // some basic styles to make the items look a bit nicer 一些基本的样式可以让衣服看起来更好看
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,
    width: 300,
    // 拖拽的时候背景变化
    background: isDragging ? "lightgreen" : "#ffffff",

    // styles we need to apply on draggables 我们需要应用于拖放的样式
    ...draggableStyle
  }
  return styleOnject;
};
const getListStyle = () => ({
  background: 'black',
  padding: grid,
  marginRight: 20,
  width: 250,
});




export default class ResourceAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dragArray: {
        leftContent,
        middleContent: [],
      },
      typeTemp: 'item',
    };
  }

  onDragEnd = (result) => {
    console.log('result', result)
    if (!result.destination) {
      return;
    }

    const dragArray = reorder(
      this.state.dragArray,
      result.source.index,
      result.destination.index,
      result.source.droppableId,
      result.destination.droppableId,

    );

    this.setState({
      dragArray,
    });
  }

  /**
   * @function 根据类型渲染不同的拖拽组件
   * @param {object} item 数组项
   * @param {number} index 数组项在数组中的位置
   * */
  renderDragByType = (item, index) => {
    let DragElement = null;
    switch (item.type) {
      case 'container':
        DragElement = (
          <Draggable
            key={item.draggableId}
            draggableId={item.draggableId}
            index={index}
          >
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={setContainerStyle(
                  snapshot.isDragging,
                  provided.draggableProps.style
                )}
              >
                {item.title}
                <Droppable
                  droppableId={`${item.type}-${index}`}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      style={{
                        background: 'green',
                        padding: grid,
                        marginRight: 20,
                        width: 250
                      }}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <span className={styles.titleChild}>容器配置</span>
                      {this.renderContainerContent(`${item.type}-${index}`, index)}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            )}
          </Draggable>
        );
        break;
      default:
        DragElement = (
          <Draggable
            key={item.draggableId}
            draggableId={item.title}
            index={index}
          >
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={setItemStyle(
                  snapshot.isDragging,
                  provided.draggableProps.style
                )}
              >
                {item.title}
              </div>
            )}
          </Draggable>
        );
        break;
    }
    return DragElement;
  }

  /**
   * @function 渲染左侧内容
   * */
  renderLeftContent = () => {
    let leftContentElment = null;
    leftContentElment = leftContent.map((item, index) => (
      <Draggable
        key={item.id}
        draggableId={item.title}
        index={index}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={setItemStyle(
              snapshot.isDragging,
              provided.draggableProps.style
            )}
          >
            {item.title}
          </div>
        )}
      </Draggable>
    ))
    return leftContentElment;
  }

  /**
  * @function 渲染中间内容
  * */
  renderMiddleContent = () => {
    const { dragArray: { middleContent } } = this.state;
    let middleContentElment = null;
    middleContentElment = middleContent.map((item, index) => (
      this.renderDragByType(item, index)
    ));
    return middleContentElment;
  }

  /**
  * @function 渲染嵌套容器内容
  * @param {string} draggableId 子容器的键名
  * @param {number} index 子容器所在中间容器中的位置索引
  * */
  renderContainerContent = (draggableId, index) => {
    const { dragArray } = this.state;
    const containerArray = dragArray.middleContent[index][draggableId];
    let containerElement = null;
    if (containerArray && containerArray.length > 0) {
      containerElement = containerArray.map((item, index) => (
        <Draggable
          key={item.draggableId}
          draggableId={item.draggableId}
          index={index}
        >
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={setItemStyle(
                snapshot.isDragging,
                provided.draggableProps.style
              )}
            >
              {item.title}
            </div>
          )}
        </Draggable>
      ));
    }

    return containerElement;
  }


  onDragStart = (result) => {
    console.log('拖动开始', result);
    // const { source: { droppableId, index } } = result;
    // const { dragArray: { middleContent } } = this.state;
    // if (droppableId === 'middleContent') {
    //   console.log(middleContent)
    //   const { type } = middleContent[index];
    //   if (type === 'container') {
    //     this.setState({ typeTemp: 'typeTemp' }); // 临时改变type的值
    //   }
    // }

  }

  render() {
    return (
      <div className={styles.root} >
        <DragDropContext onDragEnd={this.onDragEnd} onDragUpdate={this.onDragStart} >
          <Droppable
            droppableId='leftContent'

          >
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={getListStyle(snapshot)}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <span className={styles.title}>参数模板</span>
                {this.renderLeftContent()}
                {provided.placeholder}
              </div>
            )}

          </Droppable>
          <Droppable
            droppableId='middleContent'
          >
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                style={{
                  background: 'black',
                  padding: grid,
                  width: 320,
                  marginRight: 20,
                }}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <span className={styles.title}>参数配置</span>
                {this.renderMiddleContent()}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div >

    );
  }
}

