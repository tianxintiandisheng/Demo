import React from "react";
import { Form, Input, Button } from "antd";
import styles from "./ContainerEdit.less";

const { Item } = Form;
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

class ContainerEdit extends React.Component {
  render() {
    const {
      onModelNameChange, onRemarkChange, sourceItem, setContainerEdit,
    } = this.props;
    return (
      <Form {...formItemLayout}>
        <Item label="容器名称" required>
          <Input value={sourceItem.modelName} placeholder="请输入容器名称" onChange={onModelNameChange} />
        </Item>

        <Item label="容器说明">
          <Input.TextArea value={sourceItem.remark} placeholder="请输入容器说明" rows={4} onChange={onRemarkChange} />
        </Item>

        <div className={styles.buttonBox}>
          <Button type="primary" onClick={setContainerEdit}>容器编辑</Button>
        </div>
      </Form>
    );
  }
};



export default ContainerEdit;
