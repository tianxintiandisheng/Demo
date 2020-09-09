import React, { Component } from "react";
import { Card, InputNumber, Row, Col } from "antd";

class NumberInput extends Component {
  render() {
    return (
      <Card title="模板名称：数值输入" size="small">
        <Row type="flex" align="middle">
          <Col span={8}>规格参数名称：</Col>
          <Col span={8}>
            <InputNumber onChange={this.onChange} placeholder="取值" />
          </Col>
          <Col span={8}>规格参数单位</Col>
        </Row>
      </Card>
    );
  }
}
export default NumberInput;
