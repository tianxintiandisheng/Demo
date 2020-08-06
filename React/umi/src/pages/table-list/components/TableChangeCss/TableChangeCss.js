/**
 * @file 列表奇偶行设置不同样式;通过CSS选择器为奇偶行设置不同样式
 * */

import React from "react";
import { Table } from 'antd';

import styles from "./TableChangeCss.less";

const dataSource = [
  {
    key: '1',
    name: '张三',
    age: 32,
    address: '西湖区',
  },
  {
    key: '2',
    name: '李四',
    age: 42,
    address: '下城区',
  },
  {
    key: '3',
    name: '王五',
    age: 52,
    address: '上城区',
  },
  {
    key: '4',
    name: '赵六',
    age: 26,
    address: '余杭区',
  },
  {
    key: '5',
    name: '胡彦祖',
    age: 29,
    address: '萧山区',
  },
];

const columns = [
  {
    title: '序号',
    render: (text, record, index) => `${index + 1}`,
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
];


class TableChangeCss extends React.Component {
  render() {
    return (
      <div className={styles.root}>
        <Table dataSource={dataSource} columns={columns} pagination={false} />
      </div>
    );
  }
};

export default TableChangeCss;
