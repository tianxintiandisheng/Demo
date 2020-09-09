import React, { Component } from "react";
import { connect } from "dva";
import { Modal, Button, Table, Card, Radio, Input } from "antd";
import AddItem from "./additem";
import styles from "./index.less";

const { Search } = Input;
@connect(({ codeLibrariesModel }) => ({ codeLibrariesModel }))
class CodeLibraries extends Component {
  state = {
    pageNum: 1,
    pageSize: 5,
    codeId: '',
    expandedRowKeys: [],
    search: '',
  };



  columns = [
    {
      title: '参数编码',
      dataIndex: 'codeName',
      key: 'codeName',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: val => {
        let item = ''
        switch (val) {
          case 1:
            item = '系统内置'
            break;
          case 2:
            item = '自定义'
            break;
          default: item = ''
            break;
        }
        return (
          <span>{item}</span>
        )
      },
    },
    {
      title: '编码说明',
      dataIndex: 'remark',
      key: 'remark',
    },
    {
      title: '操作',
      key: 'operate',
      dataIndex: 'operate',
      render: (val, c) => {
        const { codeId } = c
        return (
          <Button type="link" onClick={() => this.detail(codeId, c)}>取值详情</Button>
        )
      },
    },
  ];

  componentDidMount() {
    this.getData()
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { CodeLibrariesVisible } = nextProps;
    // 当传入的type发生变化的时候，更新state
    if (CodeLibrariesVisible !== prevState.CodeLibrariesVisible) {
      return {
        CodeLibrariesVisible,
        search: '',
      };
    }
    // 否则，对于state不进行任何操作
    return null;
  }

  componentDidUpdate(prevProps) {
    const { CodeLibrariesVisible } = this.props
    if ((prevProps.CodeLibrariesVisible !== CodeLibrariesVisible) && CodeLibrariesVisible) {
      this.getData()
    }
  }

  detail = (thisCodeId, c) => {
    const { codeId } = this.state
    if (thisCodeId === codeId) {
      this.setState({
        codeId: '',
        c,
        expandedRowKeys: [],
      })
    } else {
      this.setState({
        codeId: thisCodeId,
        c,
        expandedRowKeys: [thisCodeId],
      })
    }
  }

  getData = () => {
    const { dispatch } = this.props
    const { pageNum, pageSize, search } = this.state
    dispatch({
      type: "codeLibrariesModel/secCodeMgtList",
      payload: {
        search,
        pageNum,
        pageSize,
      },
    })
  }

  tableChange = (pagination) => {
    // console.log(pagination)
    const { current, pageSize } = pagination
    this.setState({
      pageNum: current,
      pageSize,
    }, this.getData)
  }

  onRadioChange = e => {
    this.setState({
      RadioValue: e.target.value,
    });
  };

  render() {
    const { CodeLibrariesVisible, codeLibrariesModel, handleOk } = this.props;
    const { pageNum, pageSize, codeId, c, RadioValue, expandedRowKeys } = this.state
    const { CodeMgtList = [], totalCount = 0 } = codeLibrariesModel

    return (
      <Modal
        title="规格参数编码库"
        visible={CodeLibrariesVisible}
        onOk={() => handleOk({ ...c, RadioValue })}
        onCancel={() => handleOk()}
        className={styles.root}
        destroyOnClose
        width={720}
      >

        <AddItem getData={this.getData} />
        <div style={{ fontWeight: 'bold' }}>
          编码详情
        </div>
        <div style={{ textAlign: 'right', padding: '16px 0', border: '1px solid #888888' }}>
          <Search
            placeholder="请输入"
            onSearch={value => { this.setState({ search: value }, this.getData) }}
            style={{ width: 338, paddingBottom: 8 }}
          />
          <Table
            columns={this.columns}
            dataSource={CodeMgtList}
            rowKey='codeId'
            expandedRowKeys={expandedRowKeys}
            expandedRowRender={record => {
              // console.log(record)
              // if (!record) {
              //   return
              // }
              let val = []
              if (record && (record.codeId === codeId)) {
                const value = record.value ? (record.value || []).slice(1, -1).split(',') : []
                val = (
                  <Card
                    size="small"
                    title={record.codeName}
                  // style={{ width: 300 }}
                  >
                    <Radio.Group onChange={this.onRadioChange} value={RadioValue} disabled>
                      {value.map((item) => (
                        <Radio key={item} value={item}>{item}</Radio>
                      ))}
                    </Radio.Group>
                  </Card>
                )
              }
              return val
            }
            }
            // title={() => ("编码详情")}
            size='small'
            pagination={{
              total: totalCount,
              pageSize,
              current: pageNum,
              pageSizeOptions: ['5', '10', '20'],
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: total =>
                `共有 ${total} 条 第 ${pageNum}/${Math.ceil(
                  total / pageSize
                )}页`,
            }}
            onChange={this.tableChange}
          />
        </div>
      </Modal>
    );
  }
}

export default CodeLibraries;
