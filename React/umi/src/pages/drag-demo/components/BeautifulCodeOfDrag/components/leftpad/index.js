import React, { Component } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Card, Row, Col } from "antd";
import imgErr from "../../assets/images/imgErr.png";
import 规格类型取值 from "../../assets/images/newmarket/规格类型取值.png";
import 取值 from "../../assets/images/newmarket/取值.png";
import 参数确认 from "../../assets/images/newmarket/参数确认.png";
import 文本输入 from "../../assets/images/newmarket/文本输入.png";
import 数值输入 from "../../assets/images/newmarket/数值输入.png";
import container from "../../assets/images/newmarket/container.png"
import FormPad from "../formpad";

// import { API_PREFIX } from "@/common/constant";
import styles from "./index.less";

const templateArray = [
  {
    checkType: "选择型模板",
    children: [
      {
        checkType: `1`,
        modelName: '规格类型 + 取值',
      },
      {
        checkType: `2`,
        modelName: '取值',
      },
      {
        checkType: `5`,
        modelName: '参数确认',
      },
    ],
  },
  {
    checkType: '输入型模板',
    children: [
      {
        checkType: `3`,
        modelName: '文本输入',
      },
      {
        checkType: `4`,
        modelName: '数值输入',
      },
    ],
  },
];

const templateArrayContainer = [
  {
    checkType: "选择型模板",
    children: [
      {
        checkType: `1`,
        modelName: '规格类型 + 取值',
      },
      {
        checkType: `2`,
        modelName: '取值',
      },
      {
        checkType: `5`,
        modelName: '参数确认',
      },
    ],
  },
  {
    checkType: '输入型模板',
    children: [
      {
        checkType: `3`,
        modelName: '文本输入',
      },
      {
        checkType: `4`,
        modelName: '数值输入',
      },
    ],
  },
  {
    checkType: '布局模板',
    children: [
      {
        checkType: `6`,
        modelName: '容器',
      },
    ],
  },
];


/**
 * @function 拖拽后重新排序结果
 * */
const reorder = (list, startIndex, endIndex) => {
  const result = list;
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class LeftPad extends Component {
  state = {};

  componentDidMount() { }

  renderCardInfo = (checkType) => {
    let src = imgErr
    switch (checkType) {
      case '1':
        src = 规格类型取值;
        break;
      case '2':
        src = 取值;
        break;
      case '3':
        src = 文本输入;
        break;
      case '4':
        src = 数值输入;
        break;
      case '5':
        src = 参数确认;
        break;
      case '6':
        src = container;
        break;
      default:
        src = imgErr;
        break;
    }
    return <img src={src} alt="模板选项" style={{ maxWidth: "100%" }} />;
  };

  onDragEnd = result => {
    if (!result.destination) {
      return;
    }
    if (result.destination.droppableId !== "MiddlePad") {
      return;
    }
    const { sourceIdList } = this.props;
    const lengthId = sourceIdList.length
    let sourceIdListNew = sourceIdList
    if (result.destination.droppableId === 'MiddlePad' && result.source.droppableId === 'LeftPad') {
      sourceIdListNew.splice(result.destination.index, 0, {
        checkType: result.draggableId,
        id: `fromId${lengthId}`,
      })
    } else if (result.destination.droppableId === 'MiddlePad' && result.source.droppableId === 'MiddlePad') {
      sourceIdListNew = reorder(
        sourceIdList,
        result.source.index,
        result.destination.index
      );
    }
    const { getSourceId } = this.props
    getSourceId(`fromId${lengthId}`, sourceIdListNew)
  }

  onRemove = removedItem => {

    const { id: removedId } = removedItem;
    const { getSourceId, sourceIdList } = this.props;
    const sourceIdListNew = sourceIdList;
    const removeIndex = sourceIdList.findIndex(item => item.id === removedId);

    sourceIdListNew.splice(removeIndex, 1);
    getSourceId("", sourceIdListNew)
  }

  colClick = (id) => {
    const { getSourceId, sourceIdList } = this.props
    getSourceId(id, sourceIdList)
  }

  render() {
    const { sourceIdList, sourceId, isContainerEdit } = this.props;
    let templateDate = templateArrayContainer;
    if (isContainerEdit) {
      templateDate = templateArray;
    }
    return (
      <div className={styles.root} style={{ display: "flex" }}>
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId="LeftPad">
            {(
              provided // snapshot
            ) => {
              return (
                <div
                  ref={provided.innerRef}
                  // style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                  style={{ width: 353 }}
                >
                  <div className={styles.formwork}>
                    参数模板
                  </div>
                  {templateDate.map((ele) => (
                    <div className={styles.detail} key={ele.checkType}>
                      <div className={styles.typeboard}>
                        {ele.checkType}
                      </div>
                      {ele.children ? ele.children.map((item, index) => (
                        <Draggable
                          key={item.checkType}
                          draggableId={item.checkType}
                          index={index}
                        >
                          {(draggableProvided,// snapshot
                          ) => {
                            return (
                              <div>
                                <div
                                  ref={draggableProvided.innerRef}
                                  {...draggableProvided.dragHandleProps}
                                  {...draggableProvided.draggableProps}
                                >
                                  <Card
                                    title={(<span style={{ fontSize: 12 }}>{`模板名称：${item.modelName}`}</span>)}
                                    size="small"
                                    style={{ margin: '8px 16px 8px 16px' }}
                                    bodyStyle={{ padding: 0 }}
                                  >
                                    {this.renderCardInfo(item.checkType)}
                                  </Card>
                                </div>
                                {draggableProvided.placeholder}
                              </div>
                            )
                          }}
                        </Draggable>
                      )) : null}
                    </div>
                  ))}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
          <Droppable droppableId="MiddlePad">
            {(
              provided // snapshot
            ) => {
              return (
                <div
                  ref={provided.innerRef}
                  // style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                  style={{ flex: "auto" }}
                >

                  <Row>
                    {sourceIdList.map((item, index) => {
                      return (
                        <Col
                          key={item.id}
                          onClick={() => this.colClick(item.id)}
                          style={{
                            border: sourceId === item.id ? '1px solid blue' : 'unset',
                          }}
                        >
                          <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}
                          >
                            {(
                              draggableProvided // snapshot
                            ) => {
                              return (
                                <div>
                                  <div
                                    ref={draggableProvided.innerRef}
                                    {...draggableProvided.dragHandleProps}
                                    {...draggableProvided.draggableProps}
                                  >
                                    <FormPad
                                      checkType={item.checkType}
                                      sourceItem={item}
                                      onRemove={() => {
                                        this.onRemove(item)
                                      }}
                                    />
                                  </div>
                                </div>
                              );
                            }}
                          </Draggable>
                        </Col>
                      );
                    })}
                  </Row>
                  {provided.placeholder}
                </div>
              );
            }}

          </Droppable>

        </DragDropContext>
      </div>
    );
  }
}
export default LeftPad;
