import React from "react";
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import styles from "./BasicsDrag.less";

class BasicsDrag extends React.Component {

  onDragEnd = (result) => {
    console.log(result);
  }
  /**
   * @function 渲染拖拽项目
   * @param {array} dragArray
   * @return {array} react element 
   * */
  renderDragItem = (dragArray) => {
    let dragElement = null;
    dragElement = dragArray.map((item, index) => {
      const dragItem = (
        <Draggable
          key={item.title}
          draggableId={item.title}
          index={index}
        >
          {provided => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              {item.title}
            </div>
          )}
        </Draggable>
      );
      return dragItem;
    })
    return dragElement;
  }

  render() {
    const dragArray = [
      {
        title: "item1"
      },
      {
        title: "item2"
      },
      {
        title: "item3"
      },
    ]
    return (
      <div className={styles.root}>
        <DragDropContext
          onDragEnd={this.onDragEnd}
        >
          {/* Your target */}
          <Droppable droppableId="id">
            {
              provided => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {this.renderDragItem(dragArray)}
                  {provided.placeholder}
                </div>
              )
            }
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
};



export default BasicsDrag;
