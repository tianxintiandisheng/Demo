import React, { Component } from 'react';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';

// 数据源
const data = [
  { genre: '运动', sold: 275 },
  { genre: '策略', sold: 115, income: 667 },
  { genre: 'action', sold: 120, income: 9182 },
  { genre: '设计', sold: 350, income: 5271 },
  { genre: '其他', sold: 150, income: 3710 }
];

// 定义度量
const cols = {
  sold: { alias: '销售量' },
  genre: { alias: '游戏种类' }

};


class About extends Component {
  render() {
    return (
      <Chart padding={{ top: 40, right: 20, bottom: 60, left: 60 }} width={600} height={400} data={data} scale={cols}>
        <Axis name="genre" title />
        <Axis name="sold" title />
        <Legend position="top" dy={-20} />
        <Tooltip />
        <Geom type="interval" position="genre*sold" color="genre" />
      </Chart>
    );
  }
}

export default About;


