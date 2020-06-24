import React, { Component } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";


/**
 * @function 生成初始数组
 * @param {number} count 数组长度
 * @returns {array}
 * */
const createItems = count =>
  new Array(count).fill('item').map((item, index) => ({
    id: `${item}-${index + 1}`,
    content: `this is content ${index + 1}`
  }))


/**
 * @function 生成排序后的数组
 * @param {array} list 排序前数组
 * @param {number} startIndex 元素在被拖动前所在索引
 * @param {number} endIndex 元素在被拖动后位置所在索引
 * @return {array} result 排序后数组
 * */
const reorder = (list, startIndex, endIndex) => {
  // const result = Array.from(list);
  // console.log('result.splice(startIndex, 1)', result.splice(startIndex, 1))
  // const [removed] = result.splice(startIndex, 1);
  // console.log('removed', removed)
  // result.splice(endIndex, 0, removed);
  const result = Array.from(list); // 此处需要深拷贝
  result[startIndex] = list[endIndex];
  result[endIndex] = list[startIndex];
  return result;
};

const grid = 8;

// 设置样式
/**
 * @function 设置样式
 * @param {boolean} isDragging 是否在拖拽状态；
 * @param {object} draggableStyle
 * @returns {object} styleOnject 存储样式的对象
 * */
const setItemStyle = (isDragging, draggableStyle) => {
  console.log('isDragging', isDragging);
  console.log('draggableStyle', draggableStyle)
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

const getListStyle = () => ({
  background: 'black',
  padding: grid,
  width: 250
});



export default class ReactBeautifulDnd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: createItems(6)
    };
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items
    });
  }


  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <center>
          <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                //provided.droppableProps应用的相同元素.
                {...provided.droppableProps}
                // 为了使 droppable 能够正常工作必须 绑定到最高可能的DOM节点中provided.innerRef.
                ref={provided.innerRef}
                style={getListStyle(snapshot)}
              >
                {this.state.items.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id}
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
                        {item.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </center>
      </DragDropContext>
    );
  }
}

